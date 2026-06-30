import { useQuery } from "react-query";
import base_url from "../index.js";

// true jika NODE_ENV bukan 'production' (baca dari .env)
const isDev = process.env.NODE_ENV !== 'production';
const PER_PAGE = 8;

// ── Development helpers ──────────────────────────────────────────────────────
// Semua data di-load dari public/data/ (hasil prefetch.js), lalu difilter &
// dipaginasi di sisi klien sehingga tidak perlu hit endpoint saat dev.

async function loadLocalBlogs() {
    const res = await fetch('/data/blogs.json');
    if (!res.ok) {
        throw new Error(
            'Data prefetch tidak ditemukan. Jalankan: node prefetch.js'
        );
    }
    return res.json(); // array of all blogs
}

async function loadLocalTags() {
    const res = await fetch('/data/tags-most-used.json');
    if (!res.ok) {
        throw new Error(
            'Data prefetch tidak ditemukan. Jalankan: node prefetch.js'
        );
    }
    return res.json(); // [{ name, count }, ...]
}

// ── useDatablogs ─────────────────────────────────────────────────────────────

const fetchBlogsDev = async ({ queryKey }) => {
    const [, { page, title, tag }] = queryKey;

    let blogs = await loadLocalBlogs();

    if (title) {
        const q = title.toLowerCase();
        blogs = blogs.filter((b) => b.title?.toLowerCase().includes(q));
    }
    if (tag) {
        blogs = blogs.filter((b) => b.tags?.includes(tag));
    }

    const total    = blogs.length;
    const lastPage = Math.max(1, Math.ceil(total / PER_PAGE));
    const start    = (page - 1) * PER_PAGE;

    return {
        current_page: page,
        per_page:     PER_PAGE,
        last_page:    lastPage,
        total_blogs:  total,
        data:         blogs.slice(start, start + PER_PAGE),
    };
};

const fetchBlogsProd = async ({ queryKey }) => {
    const [, { page, title, tag }] = queryKey;

    const params = new URLSearchParams({ page: page.toString(), per_page: PER_PAGE });
    if (title) params.append('title', title);
    if (tag)   params.append('tag',   tag);

    const res = await fetch(`${base_url()}/labs/search?${params.toString()}`);
    if (!res.ok) throw new Error('Gagal mengambil artikel');
    return res.json();
};

export const useDatablogs = ({ page, title = '', tag = '' }) => {
    return useQuery({
        queryKey:  ['blogs', { page, title, tag }],
        queryFn:   isDev ? fetchBlogsDev : fetchBlogsProd,
        cacheTime: 3_600_000,
        staleTime: 1_800_000,
        select: (response) => ({
            current_page: response.current_page,
            per_page:     response.per_page,
            last_page:    response.last_page,
            total_blogs:  response.total_blogs,
            data: response.data.map((blog) => ({
                ...blog,
                short_description:
                    blog.short_description?.length > 150
                        ? blog.short_description.slice(0, 150) + '...'
                        : blog.short_description,
            })),
        }),
        enabled: !!page,
    });
};

// ── useMostUsedTags ──────────────────────────────────────────────────────────

export const useMostUsedTags = () => {
    return useQuery('mostUsedTags', async () => {
        if (isDev) return loadLocalTags();

        const res = await fetch(`${base_url()}/labs/tags/most-used`);
        if (!res.ok) throw new Error('Gagal mengambil tag terpopuler');
        return res.json();
    });
};

// ── useSearchTags ────────────────────────────────────────────────────────────
// Dev: filter dari file lokal. Prod: hit endpoint /labs/tags?title=...

export const useSearchTags = (title) => {
    return useQuery({
        queryKey: ['search-tags', title],
        queryFn:  async () => {
            if (!title) return [];

            if (isDev) {
                const tags = await loadLocalTags();
                const q    = title.toLowerCase();
                return tags.filter((t) => t.name?.toLowerCase().includes(q));
            }

            const res = await fetch(`${base_url()}/labs/tags?title=${encodeURIComponent(title)}`);
            if (!res.ok) throw new Error('Gagal mencari tag');
            return res.json();
        },
        enabled:   !!title,
        staleTime: 5 * 60_000,
    });
};
