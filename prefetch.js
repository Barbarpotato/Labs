/**
 * prefetch.js — jalankan sekali sebelum `npm run dev`
 * Mengambil data dari API produksi dan menyimpannya ke public/data/
 * sehingga development mode tidak perlu hit endpoint (menghindari CORS).
 *
 * Usage:  node prefetch.js
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const API = 'https://api-barbarpotato.vercel.app';
const OUT  = './public/data';
const PER_PAGE = 8;

async function fetchAllBlogs() {
    let all      = [];
    let page     = 1;
    let lastPage = 1;

    do {
        const res = await fetch(`${API}/labs/search?page=${page}&per_page=${PER_PAGE}`);
        if (!res.ok) throw new Error(`Gagal fetch halaman ${page}: HTTP ${res.status}`);

        const json = await res.json();
        all       = all.concat(json.data);
        lastPage  = json.last_page;

        console.log(`  [blogs] halaman ${page}/${lastPage} — ${json.data.length} artikel`);
        page++;
    } while (page <= lastPage);

    return all;
}

async function fetchMostUsedTags() {
    const res = await fetch(`${API}/labs/tags/most-used`);
    if (!res.ok) throw new Error(`Gagal fetch tags: HTTP ${res.status}`);
    return res.json();
}

async function main() {
    console.log('Prefetching data dari API produksi...\n');
    mkdirSync(OUT, { recursive: true });

    const [blogs, tags] = await Promise.all([
        fetchAllBlogs(),
        fetchMostUsedTags(),
    ]);

    writeFileSync(join(OUT, 'blogs.json'),          JSON.stringify(blogs, null, 2));
    writeFileSync(join(OUT, 'tags-most-used.json'), JSON.stringify(tags,  null, 2));

    console.log(`\n✓ ${blogs.length} artikel  → public/data/blogs.json`);
    console.log(`✓ ${tags.length}  tag       → public/data/tags-most-used.json`);
}

main().catch((err) => {
    console.error('\nPrefetch gagal:', err.message);
    process.exit(1);
});
