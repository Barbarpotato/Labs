import Head from 'next/head';

// Fetch the slugs for all articles
export async function getStaticPaths() {
    const res = await fetch('https://cerberry-backend.vercel.app/blogs/all');
    const articles = await res.json();

    const paths = articles.map((article) => ({
        params: { slug: article.blog_id },
    }));

    return { paths, fallback: false };
}

// Fetch data for a single article based on the slug
export async function getStaticProps({ params }) {
    const res = await fetch(`https://cerberry-backend.vercel.app/blogs/${params.slug}`);
    const article = await res.json();

    return {
        props: {
            article,
        }
    };
}

export default function ArticlePage({ article }) {
    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={article.short_description} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.short_description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://barbarpotato.github.io/article/${article.slug}`} />
            </Head>
            <article>
                <h1>{article.title}</h1>
                <p>{article.timestamp}</p>
                <div dangerouslySetInnerHTML={{ __html: article.description }} />
            </article>
        </>
    );
}
