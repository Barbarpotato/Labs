import Head from 'next/head';
import { Box, Center, Heading, Image } from "@chakra-ui/react";
import { useEffect } from 'react';

// Fetch the slugs for all articles
export async function getStaticPaths() {
    const res = await fetch('https://api-barbarpotato.vercel.app/labs');

    if (!res.ok) {
        console.error('Failed to fetch articles:', res.statusText);
        return { paths: [], fallback: false };
    }

    const articles = await res.json();

    const paths = articles.map((article) => ({
        params: { slug: article.slug }, // Ensure the slug is correct
    }));

    return { paths, fallback: false };
}

// Fetch data for a single article based on the slug
export async function getStaticProps({ params }) {
    const res = await fetch(`https://api-barbarpotato.vercel.app/labs/search?slug=${params.slug}`);

    if (!res.ok) {
        console.error('Failed to fetch article:', res.statusText);
        return { notFound: true }; // Optionally handle missing content
    }

    // get the response json
    let article = await res.json();

    // if the response data return the array. only get the first index
    if (Array.isArray(article)) article = article[0];

    return {
        props: {
            article,
        }
    };
}

export default function ArticlePage({ article }) {

    useEffect(() => {
        const applyStyles = () => {
            const contentDiv = document.querySelector('.content');
            if (!contentDiv) return;

            const preTags = contentDiv.querySelectorAll('pre');
            const codeTags = contentDiv.querySelectorAll('code');

            preTags.forEach(tag => {
                tag.style.width = "1024px";
                const parentDiv = tag.parentNode;
                parentDiv.style.overflowX = 'scroll';
                parentDiv.style.marginBlock = '15px';

                tag.style.backgroundColor = '#272822';
                tag.classList.add('custom-pre');
            });

            codeTags.forEach(tag => {
                tag.classList.add('custom-code');
            });
        };

        applyStyles();

        // Reapply styles whenever the content changes
        const observer = new MutationObserver(applyStyles);
        const contentDiv = document.querySelector('.content');
        if (contentDiv) {
            observer.observe(contentDiv, { childList: true, subtree: true });
        }

        // Cleanup observer on component unmount
        return () => {
            if (contentDiv) {
                observer.disconnect();
            }
        };
    }, [article]);

    return (
        <>
            <Head>
                <link rel="icon"
                    href="https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445"
                    type="image/svg+xml" />
                <title>{article.title}</title>
                <meta name="google-site-verification" content="OaSWua2pdfv0KF_FFiMg9mzJSLR7r9MytkWJI3mLf_8" />
                <meta name="description" content={article.short_description} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.short_description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://barbarpotato.github.io/labs/${article.slug}`} />
            </Head>
            <article>

                <Box mx="auto" w={{ base: '70%', md: '35%' }}>
                    <Heading style={{ color: 'whitesmoke', fontWeight: 'bold' }}>{article?.title}</Heading>
                </Box>
                <Center pt={2} pb={10}>
                    <Image
                        borderRadius={'lg'}
                        w={{ base: '70%', md: '35%' }}
                        display={'flex'}
                        justifyContent={'center'}
                        src={article?.image}
                    />
                </Center>
                <Box mx="auto" w={{ base: '70%', md: '35%' }} display="flex" justifyContent="center">
                    <div
                        className="content"
                        style={{ overflowX: 'auto', fontSize: '1.3em' }}
                        dangerouslySetInnerHTML={{ __html: article?.description }}
                    />
                </Box>
            </article>
        </>
    );
}
