import Link from 'next/link';

export async function getStaticProps() {
    const res = await fetch('https://cerberry-backend.vercel.app/blogs/all');
    const articles = await res.json();

    return {
        props: {
            articles,
        },
    };
}

export default function Home({ articles }) {
    return (
        <div>
            <h1>Blog Articles</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article.slug}>
                        <Link href={`/article/${article.slug}`}>
                            <a>{article.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
