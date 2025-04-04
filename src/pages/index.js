import Head from 'next/head';
import { Fragment, useState } from 'react';
import {
    Card, CardBody, Image, Flex, Button, HStack,
    Heading, Text, Grid, Box, Input
} from '@chakra-ui/react';
import { motion } from 'framer-motion';


export async function getStaticProps() {
    try {
        const res = await fetch('https://api-barbarpotato.vercel.app/labs');
        if (!res.ok) throw new Error('Fetch failed');
        const response = await res.json();
        return {
            props: {
                articles: response.data || [],
            },
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return {
            props: {
                articles: [],
            },
        };
    }
}


export default function Home({ articles }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // <-- lifted state

    const filteredArticles = articles.filter((article) =>
        (article?.title ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article?.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Reset to first page on search input change
    const handleSearchChange = (e) => {
        setCurrentPage(1); // <-- reset to first page
        setSearchQuery(e.target.value);
    };

    return (
        <Fragment>
            <Head>
                <meta name="google-site-verification" content="OaSWua2pdfv0KF_FFiMg9mzJSLR7r9MytkWJI3mLf_8" />
                <title>Darmawan Jr - Labs</title>
                <link rel="icon"
                    href="https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445"
                    type="image/svg+xml" />
                <meta name="author" content="Darmawan Jr" />
                <meta name="description"
                    content="Darma is a Software Engineer known for flexibility in adapting to changing technologies and project demands." />
                <meta name="keywords"
                    content="Darmawan Jr, Software Engineer, system design, software testing, project management" />
                <link rel="canonical" href="https://barbarpotato.github.io" />
                <meta property="og:description"
                    content="Darma is a Software Engineer known for flexibility in adapting to changing technologies and project demands." />
                <meta property="og:url" content="https://barbarpotato.github.io/" />
                <meta property="og:type" content="website" />
            </Head>

            <Heading textAlign={'center'} size={{ base: 'md', md: 'xl' }}
                marginTop={{ base: '15px', md: '50px' }} marginBottom={'30px'} color={"#faf9ff"}>
                What Are You Looking For?
            </Heading>

            <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Flex w={{ base: '90%', md: '50%' }} textAlign={'center'}>
                    <Input
                        onChange={handleSearchChange}
                        value={searchQuery}
                        placeholder='Search Content Labs...'
                        color={"#faf9ff"}
                        borderRadius={'2xl'}
                        size={{ base: 'md', lg: 'lg' }}
                        borderWidth={3}
                        borderColor={"#536189"}
                        focusBorderColor={"#ff79c6"}
                    />
                </Flex>
            </Flex>

            <LabPagination
                blog={filteredArticles}
                itemsPerPage={9}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </Fragment>
    );
}


function Items({ blog }) {
    return (
        <Fragment>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 1,
                    ease: [0, 0.71, 0.2, 1.01]
                }}>
                <Grid marginTop={"60px"} marginInline={{ base: '20px', md: '12%' }} gap={6}
                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
                    {blog?.map((item) => (
                        <Card key={item?.id || Math.random()} borderRadius={'2xl'} mb={20} boxShadow={'dark-lg'}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Image
                                    h={'300px'}
                                    src={item?.image || 'fallback-image.jpg'}
                                    alt={item?.image_alt || 'Article image'}
                                    borderRadius='lg'
                                />
                            </Box>
                            <CardBody backgroundColor={"#292b37"}>
                                <Flex height={'200px'} mt='6' direction='column'>
                                    <Heading color={"#faf9ff"} size='md'>{item?.title || 'Untitled'}</Heading>
                                    <Text my={2} color={"#faf9ff"}>
                                        Published: {item?.timestamp || 'Unknown date'}
                                    </Text>
                                    <Text textAlign={"justify"} color={"#faf9ff"}>
                                        {item?.short_description?.length > 100
                                            ? `${item.short_description.slice(0, 100)}...`
                                            : item?.short_description || 'No description'}
                                    </Text>
                                    <a href={`/Labs/${item?.slug || ''}`} style={{ color: '#bd93f9', textDecoration: 'underline' }}>
                                        Read More...
                                    </a>
                                </Flex>
                            </CardBody>
                        </Card>
                    ))}
                </Grid>
            </motion.div>
        </Fragment>
    );
}


function LabPagination({ blog, itemsPerPage = 9, currentPage, onPageChange }) {
    const totalPages = Math.max(1, Math.ceil(blog.length / itemsPerPage));

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = blog.slice(startIdx, startIdx + itemsPerPage);

    const handlePageChange = (page) => {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!blog || blog.length === 0) return null;

    const getPageNumbers = () => {
        let pages = [];
        if (totalPages <= 7) {
            pages = [...Array(totalPages)].map((_, i) => i + 1);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <>
            <Items blog={currentItems} />
            <Flex justifyContent="center" mt={10}>
                <HStack spacing={2}>
                    <Button
                        color="white"
                        onClick={() => handlePageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                        colorScheme="purple"
                        size="md"
                        variant="outline"
                    >
                        Prev
                    </Button>

                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                            <Text key={index} mx={2} color="white">
                                {page}
                            </Text>
                        ) : (
                            <Button
                                color="white"
                                key={page}
                                onClick={() => handlePageChange(page)}
                                size="md"
                                variant={page === currentPage ? "solid" : "outline"}
                                colorScheme={page === currentPage ? "pink" : "purple"}
                            >
                                {page}
                            </Button>
                        )
                    )}

                    <Button
                        color="white"
                        onClick={() => handlePageChange(currentPage + 1)}
                        isDisabled={currentPage === totalPages}
                        colorScheme="purple"
                        size="md"
                        variant="outline"
                    >
                        Next
                    </Button>
                </HStack>
            </Flex>
            <Text mt={4} textAlign="center" color="#faf9ff">
                Page {currentPage} of {totalPages}
            </Text>
        </>
    );
}

