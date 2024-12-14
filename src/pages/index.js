import Link from 'next/link';
import { Fragment, useState } from 'react'
import ReactPaginate from 'react-paginate';
import {
    Card, CardBody, Image, Flex,
    Heading, Text, Grid, Box, Input, Button
} from '@chakra-ui/react'
import { motion } from 'framer-motion'


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

    const [searchQuery, setSearchQuery] = useState("");

    // Filter the articles based on the search query
    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Fragment>

            <Heading textAlign={'center'} size={{ base: 'md', md: 'xl' }}
                marginTop={{ base: '15px', md: '50px' }} marginBottom={'30px'} color={"#faf9ff"}>What Are You Looking For?</Heading>

            <Flex w={'100%'} justifyContent={'center'}
                alignItems={'center'}>
                <Flex
                    w={{ base: '90%', md: '50%' }}
                    textAlign={'center'}
                >
                    <Input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        placeholder='Search Content Labs...'
                        color={"#faf9ff"}
                        borderTopLeftRadius={'2xl'}
                        borderBottomLeftRadius={'2xl'}
                        borderTopRightRadius={'0'}
                        borderBottomRightRadius={'0'}
                        size={{ base: 'md', lg: 'lg' }}
                        borderWidth={3}
                        colorScheme='purple'
                        borderColor={"#536189"}
                        focusBorderColor={"#ff79c6"}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                refetch();
                            }
                        }}
                    />
                    <Button
                        borderTopLeftRadius={'0'}
                        borderBottomLeftRadius={'0'}
                        size={{ base: 'md', lg: 'lg' }}
                        onClick={filteredArticles}
                        fontWeight={'bold'}
                        colorScheme='purple'
                        color={'black'}
                    >
                        Search
                    </Button>
                </Flex>
            </Flex>


            <LabPagination blog={filteredArticles} itemsPerPage={9} />
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
                <Grid marginTop={"60px"} marginInline={{ base: '20px', md: '12%' }} gap={6} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
                    {blog?.map((item) => (
                        <Card key={item.id} borderRadius={'2xl'} mb={20} boxShadow={'dark-lg'}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center">
                                <Image
                                    h={'300px'}
                                    src={item.image}
                                    alt={item.image_alt}
                                    borderRadius='lg'
                                />
                            </Box>
                            <CardBody backgroundColor={"##292b37"}>
                                <Flex height={'200px'} mt='6' direction='column'>
                                    <Heading color={"#faf9ff"} size='md'>{item.title}</Heading>
                                    <Text my={2} color={"#faf9ff"}>Published: {item.timestamp}</Text>
                                    <Text textAlign={"justify"} color={"#faf9ff"}>
                                        {item.short_description.length > 100
                                            ? `${item.short_description.slice(0, 100)}...` // Truncate the string
                                            : item.short_description}
                                    </Text>
                                    <Link style={{ color: '#bd93f9', textDecoration: 'underline' }} href={`/${item.blog_id}`}>
                                        Read More...
                                    </Link>
                                </Flex>
                            </CardBody>
                        </Card>
                    ))}
                </Grid>
            </motion.div>
        </Fragment>
    )
}

function LabPagination({ blog, itemsPerPage }) {

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;

    const currentItems = blog?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(blog?.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % blog.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items blog={currentItems} />
            <ReactPaginate
                className='react-paginate'
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
            />
        </>
    );
}
