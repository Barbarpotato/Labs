import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

function BlogCard({ blog, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
        >
            <Box
                className="project-card"
                bg="#383a4a"
                borderRadius="xl"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                minH={{ base: '400px', md: '480px' }}
                boxShadow="md"
            >
                {/* Gambar dengan efek zoom */}
                <Box className="zoom-container" h={{ base: '180px', md: '210px' }} flexShrink={0}>
                    <img
                        src={blog?.image || ''}
                        alt={blog?.image_alt || 'Gambar artikel'}
                    />
                </Box>

                {/* Isi kartu */}
                <Box p={6} display="flex" flexDirection="column" flex="1">
                    <Box flex="1">
                        {/* Tag */}
                        <Flex wrap="wrap" gap={2} mb={3}>
                            {blog?.tags?.slice(0, 3).map((tag, i) => (
                                <Box
                                    key={i}
                                    px={3}
                                    py="3px"
                                    borderRadius="full"
                                    border="1px solid rgba(134, 107, 171, 0.35)"
                                    color="#bd93f9"
                                    fontSize="2xs"
                                    fontWeight="600"
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    letterSpacing="0.04em"
                                    textTransform="uppercase"
                                >
                                    {tag}
                                </Box>
                            ))}
                        </Flex>

                        {/* Judul */}
                        <Heading
                            fontFamily="'Playfair Display', Georgia, serif"
                            fontWeight="700"
                            color="#faf9ff"
                            fontSize={{ base: 'lg', md: 'xl' }}
                            noOfLines={2}
                            mb={2}
                            lineHeight="1.35"
                        >
                            {blog?.title || 'Tanpa Judul'}
                        </Heading>

                        {/* Tanggal */}
                        <Text
                            fontFamily="'Outfit', system-ui, sans-serif"
                            color="#c0c0c0"
                            fontSize="xs"
                            mb={3}
                        >
                            {blog?.timestamp || 'Tanggal tidak diketahui'}
                        </Text>

                        {/* Deskripsi singkat */}
                        <Text
                            fontFamily="'Outfit', system-ui, sans-serif"
                            color="#d0d0d0"
                            fontSize="sm"
                            lineHeight="1.75"
                            noOfLines={3}
                        >
                            {blog?.short_description || 'Tidak ada deskripsi.'}
                        </Text>
                    </Box>

                    {/* Tombol baca */}
                    <Box
                        as="a"
                        href={`https://barbarpotato.github.io/Labs-${blog?.index}/${blog?.slug || ''}`}
                        rel="noopener noreferrer"
                        mt={5}
                        display="inline-flex"
                        alignItems="center"
                        gap={1.5}
                        color="#866bab"
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontWeight="500"
                        fontSize="sm"
                        borderBottom="1.5px solid"
                        borderColor="#866bab"
                        pb="1px"
                        width="fit-content"
                        transition="all 0.2s ease"
                        _hover={{ color: '#cc7bc9', borderColor: '#cc7bc9', textDecoration: 'none' }}
                    >
                        Baca Selengkapnya
                        <FiArrowRight size={13} />
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );
}

export default BlogCard;
