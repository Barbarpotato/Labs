import { useQuery } from "react-query";
import base_url from "../index.js";

const fetchBlogs = async ({ queryKey }) => {

    const [_key, { page, title, tag }] = queryKey;

    // Construct query parameters dynamically
    const params = new URLSearchParams({
        page: page.toString(),
        per_page: 8,
    });

    if (title) params.append("title", title);
    if (tag) params.append("tag", tag)

    const url = `${base_url()}/labs/search?${params.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
    })

    if (!response.ok) throw new Error('Failed to fetch blogs')
    return response.json()
}

// Custom hook for fetching blogs
export const useDatablogs = ({ page, title = "", tag = "" }) => {
    return useQuery({
        queryKey: ["blogs", { page, title, tag }],
        queryFn: fetchBlogs,
        cacheTime: 3600000,
        staleTime: 1800000,
        select: (response) => ({
            current_page: response.current_page,
            per_page: response.per_page,
            last_page: response.last_page,
            total_blogs: response.total_blogs,
            data: response.data.map((blog) => ({
                ...blog,
                short_description:
                    blog.short_description.length > 150
                        ? blog.short_description.slice(0, 150) + "..."
                        : blog.short_description,
            })),
        }),
        enabled: !!page, // Prevent query from running if page is undefined
    });
};

export const useMostUsedTags = () => {
    return useQuery('mostUsedTags', async () => {
        const url = `${base_url()}/labs/tags/most-used`;
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch most used tags');
        }
        const data = await response.json();
        return data;
    });
};

export const useSearchTags = (title) => {
    return useQuery({
        queryKey: ['search-tags', title],
        queryFn: async () => {
            if (!title) return [];
            const url = `${base_url()}/labs/tags?title=${title}`;
            const res = await fetch(url, { method: 'GET' });
            if (!res.ok) throw new Error('Failed to fetch tags');
            return res.json(); // [{ name: "React" }, { name: "Next.js" }]
        },
        enabled: !!title, // Only fetch if title is not empty
        staleTime: 5 * 60 * 1000, // optional: 5 min cache
    });
}