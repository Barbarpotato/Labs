import { Card, CardBody, Image, Flex, Button, Heading, Text, Box, Spacer } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function BlogCard({ blog }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
            <Card
                borderRadius="2xl"
                boxShadow="dark-lg"
                bg="#292b37"
                overflow="hidden"
                minH={{ base: "450px", md: "550px" }}
                display="flex"
                flexDirection="column"
            >
                <Image
                    h={{ base: "200px", md: "250px" }}
                    w="full"
                    src={blog?.image || 'fallback-image.jpg'}
                    alt={blog?.image_alt || 'Article image'}
                    objectFit="cover"
                    borderTopRadius="2xl"
                />

                <CardBody p={{ base: 4, md: 6 }} display="flex" flexDirection="column" flex="1">
                    <Box flex="1">
                        <Heading color="#faf9ff" size={{ base: "sm", md: "md" }} noOfLines={2}>
                            {blog?.title || 'Untitled'}
                        </Heading>
                        <Text my={2} color="#faf9ff" fontSize={{ base: "xs", md: "sm" }}>
                            {blog?.timestamp || 'Unknown date'}
                        </Text>
                        <Text
                            textAlign="justify"
                            color="gray.100"
                            fontSize={{ base: "sm", md: "md" }}
                            noOfLines={3}
                        >
                            {blog?.short_description || "No description"}
                        </Text>

                        <Flex wrap="wrap" mt={2} gap={2}>
                            {blog?.tags?.map((tag, index) => (
                                <Box
                                    key={index}
                                    bg="#E2E8F0"
                                    color="#2D3748"
                                    fontSize="2xs"
                                    fontWeight="bold"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    {tag}
                                </Box>
                            ))}
                        </Flex>
                    </Box>

                    <Button
                        as="a"
                        href={`https://barbarpotato.github.io/Labs-${blog?.index}/${blog?.slug || ''}`}
                        bg="transparent"
                        border="1px solid #bd93f9"
                        color="#bd93f9"
                        mt={5}
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="medium"
                        borderRadius="full"
                        px={5}
                        py={2}
                        _hover={{
                            bg: "#bd93f9",
                            color: "#292b37",
                            transform: "scale(1.05)",
                            transition: "all 0.3s ease",
                        }}
                        alignSelf="start"
                    >
                        Read More
                    </Button>
                </CardBody>
            </Card>

        </motion.div>
    );
}

export default BlogCard;