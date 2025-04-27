import { Flex, Button, HStack, Text, Grid, } from '@chakra-ui/react';
import BlogCard from './BlogCard';

// Custom Components
import Loading from './Loading';


function LabPagination({ blog, currentPage, lastPage, onPageChange, isLoading }) {

    if (isLoading) {
        return <Loading />;
    }

    if (!blog || blog.length === 0) {
        return (
            <Text
                textAlign="center"
                color="#faf9ff"
                mt={10}
                fontSize={{ base: 'md', md: 'xl' }}
                fontWeight="semibold"
                letterSpacing="wide"
            >
                No blogs Found!
            </Text>
        );
    }

    const getPageNumbers = () => {
        let pages = [];
        if (lastPage <= 7) {
            pages = [...Array(lastPage)].map((_, i) => i + 1);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(lastPage - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < lastPage - 2) pages.push("...");
            pages.push(lastPage);
        }
        return pages;
    };

    return (
        <>
            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap={6}
                px={{ base: 0, md: 0 }}
            >
                {blog.map((item) => (
                    <BlogCard key={item?.id || Math.random()} blog={item} />
                ))}
            </Grid>
            <Flex justifyContent="center" mt={10}>
                <HStack spacing={2}>
                    <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                        colorScheme="purple"
                        size={{ base: "sm", md: "md" }}
                        variant="outline"
                        color="#faf9ff"
                    >
                        Prev
                    </Button>
                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                            <Text key={index} mx={2} color="#faf9ff">
                                {page}
                            </Text>
                        ) : (
                            <Button
                                key={page}
                                onClick={() => onPageChange(page)}
                                size={{ base: "sm", md: "md" }}
                                variant={page === currentPage ? "solid" : "outline"}
                                colorScheme={page === currentPage ? "pink" : "purple"}
                                color="#faf9ff"
                            >
                                {page}
                            </Button>
                        )
                    )}
                    <Button
                        onClick={() => onPageChange(currentPage + 1)}
                        isDisabled={currentPage === lastPage}
                        colorScheme="purple"
                        size={{ base: "sm", md: "md" }}
                        variant="outline"
                        color="#faf9ff"
                    >
                        Next
                    </Button>
                </HStack>
            </Flex>
            <Text mt={4} textAlign="center" color="#faf9ff" fontSize={{ base: "sm", md: "md" }}>
                Page {currentPage} of {lastPage}
            </Text>
        </>
    );
}

export default LabPagination;