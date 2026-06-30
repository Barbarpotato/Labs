import { Flex, Button, HStack, Text, Grid, Box } from '@chakra-ui/react';
import BlogCard from './BlogCard';
import Loading from './Loading';

function LabPagination({ blog, currentPage, lastPage, onPageChange, isLoading }) {

    if (isLoading) {
        return <Loading />;
    }

    if (!blog || blog.length === 0) {
        return (
            <Box textAlign="center" py={20}>
                <Text
                    fontFamily="'Playfair Display', Georgia, serif"
                    fontWeight="700"
                    fontStyle="italic"
                    color="#faf9ff"
                    fontSize={{ base: 'xl', md: '2xl' }}
                    mb={2}
                >
                    Artikel tidak ditemukan
                </Text>
                <Text
                    fontFamily="'Outfit', system-ui, sans-serif"
                    color="#c0c0c0"
                    fontSize="sm"
                >
                    Coba kata kunci atau tag yang berbeda.
                </Text>
            </Box>
        );
    }

    const getPageNumbers = () => {
        let pages = [];
        if (lastPage <= 7) {
            pages = [...Array(lastPage)].map((_, i) => i + 1);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(lastPage - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < lastPage - 2) pages.push('...');
            pages.push(lastPage);
        }
        return pages;
    };

    return (
        <>
            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap={6}
            >
                {blog.map((item, i) => (
                    <BlogCard key={item?.id || Math.random()} blog={item} index={i} />
                ))}
            </Grid>

            {/* Pagination */}
            <Flex justifyContent="center" mt={12} mb={2}>
                <HStack spacing={2} flexWrap="wrap" justifyContent="center">
                    <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                        variant="outline"
                        borderColor="rgba(134, 107, 171, 0.35)"
                        color="#866bab"
                        bg="transparent"
                        _hover={{ bg: 'rgba(134, 107, 171, 0.12)', borderColor: '#866bab', color: '#cc7bc9' }}
                        _disabled={{ opacity: 0.3, cursor: 'not-allowed' }}
                        size={{ base: 'sm', md: 'md' }}
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontWeight="500"
                        borderRadius="xl"
                        px={{ base: 3, md: 5 }}
                        transition="all 0.2s ease"
                    >
                        ← Sebelumnya
                    </Button>

                    {getPageNumbers().map((page, idx) =>
                        page === '...' ? (
                            <Text
                                key={`ellipsis-${idx}`}
                                color="#c0c0c0"
                                fontFamily="'Outfit', system-ui, sans-serif"
                                fontSize="sm"
                                px={1}
                                display="flex"
                                alignItems="center"
                            >
                                {page}
                            </Text>
                        ) : (
                            <Button
                                key={page}
                                onClick={() => onPageChange(page)}
                                size={{ base: 'sm', md: 'md' }}
                                bg={page === currentPage ? '#866bab' : 'transparent'}
                                color={page === currentPage ? '#faf9ff' : '#c0c0c0'}
                                border={page === currentPage ? 'none' : '1px solid rgba(134, 107, 171, 0.25)'}
                                _hover={{
                                    bg: page === currentPage ? '#866bab' : 'rgba(134, 107, 171, 0.12)',
                                    color: '#faf9ff',
                                    borderColor: '#866bab',
                                }}
                                fontFamily="'Outfit', system-ui, sans-serif"
                                fontWeight={page === currentPage ? '600' : '400'}
                                borderRadius="xl"
                                minW={{ base: '32px', md: '40px' }}
                                transition="all 0.2s ease"
                            >
                                {page}
                            </Button>
                        )
                    )}

                    <Button
                        onClick={() => onPageChange(currentPage + 1)}
                        isDisabled={currentPage === lastPage}
                        variant="outline"
                        borderColor="rgba(134, 107, 171, 0.35)"
                        color="#866bab"
                        bg="transparent"
                        _hover={{ bg: 'rgba(134, 107, 171, 0.12)', borderColor: '#866bab', color: '#cc7bc9' }}
                        _disabled={{ opacity: 0.3, cursor: 'not-allowed' }}
                        size={{ base: 'sm', md: 'md' }}
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontWeight="500"
                        borderRadius="xl"
                        px={{ base: 3, md: 5 }}
                        transition="all 0.2s ease"
                    >
                        Berikutnya →
                    </Button>
                </HStack>
            </Flex>

            <Text
                mt={3}
                textAlign="center"
                color="#c0c0c0"
                fontFamily="'Outfit', system-ui, sans-serif"
                fontSize="sm"
            >
                Halaman {currentPage} dari {lastPage}
            </Text>
        </>
    );
}

export default LabPagination;
