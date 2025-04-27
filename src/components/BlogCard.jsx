import { Card, CardBody, Image, Flex, Button, Heading, Text, Box } from '@chakra-ui/react';
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
                h={{ base: "450px", md: "550px" }} // Fixed height
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box>
                    <Image
                        h={{ base: "200px", md: "250px" }}
                        w="full"
                        src={blog?.image || 'fallback-image.jpg'}
                        alt={blog?.image_alt || 'Article image'}
                        borderTopRadius="2xl"
                    />
                </Box>
                <CardBody p={{ base: 4, md: 6 }} flex="1">
                    <Flex direction="column" h="100%" justifyContent="space-between">
                        <Box>
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
                                noOfLines={3} // Limit description height to fit design
                            >
                                {blog?.short_description || "No description"}
                            </Text>
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
                    </Flex>
                </CardBody>
            </Card>
        </motion.div>
    );
}

export default BlogCard;