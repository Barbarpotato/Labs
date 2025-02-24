import Head from 'next/head';
import { MdSupportAgent } from "react-icons/md";
import { Box, Button, Center, Heading, Image, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef } from 'react';

// Darwin component
import Darwin from '../components/Darwin'

// Fetch the slugs for all articles
export async function getStaticPaths() {
    const res = await fetch('https://api-barbarpotato.vercel.app/labs');

    if (!res.ok) {
        console.error('Failed to fetch articles:', res.statusText);
        return { paths: [], fallback: false };
    }

    const response = await res.json();
    const articles = response.data;

    const paths = articles.map((article) => ({
        params: { slug: article.slug }, // Ensure the slug is correct
    }));

    return { paths, fallback: false };
}

// Fetch data for a single article based on the slug
export async function getStaticProps({ params }) {
    const res = await fetch(`https://api-barbarpotato.vercel.app/labs?slug=${params.slug}`);

    if (!res.ok) {
        console.error('Failed to fetch article:', res.statusText);
        return { notFound: true }; // Optionally handle missing content
    }

    // get the response json
    let article = await res.json();

    // if found then access the data property
    // the response data is an array so access the first index
    if (article.data) article = article.data[0];

    return {
        props: {
            article,
        }
    };
}

export default function ArticlePage({ article }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const btnRef = useRef()

    const isMobile = useBreakpointValue({ base: true, md: false });

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

                {/* Mobile Button */}
                {isMobile ? (
                    <button
                        ref={btnRef}
                        onClick={onOpen}
                        className='chatbot-toggle-button'
                    >
                        <MdSupportAgent size={30} color={'white'} />
                    </button>
                ) : (
                    <Button
                        ref={btnRef}
                        position="fixed"
                        right="20px"
                        bottom="20px"
                        colorScheme="purple"
                        onClick={onOpen}
                    >
                        Ask Darwin AI
                    </Button>
                )}

                <Darwin btnRef={btnRef} isOpen={isOpen} onOpen={onOpen} onClose={onClose} content={article?.description} />

            </article>
        </>
    );
}
