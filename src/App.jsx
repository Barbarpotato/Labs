import { Fragment, useReducer } from 'react';
import {
    Flex, Heading, Text, Box, Input, VStack,
    Icon, InputGroup, InputLeftElement, InputRightElement, Button,
} from '@chakra-ui/react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDatablogs, useMostUsedTags, useSearchTags } from './api/labs/GET';
import LabPagination from './components/LabPagination';
import useDebounce from './hooks/useDebounce';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import StarField from './components/StarField';

const initialState = {
    searchQuery: '',
    tagSearchQuery: '',
    selectedTag: '',
    currentPage: 1,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload, currentPage: 1 };
        case 'SET_TAG_SEARCH_QUERY':
            return { ...state, tagSearchQuery: action.payload };
        case 'SET_SELECTED_TAG':
            return { ...state, selectedTag: action.payload, currentPage: 1 };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
}

const inputStyles = {
    color: '#faf9ff',
    _placeholder: { color: '#866bab', opacity: 0.8 },
    borderRadius: 'xl',
    borderWidth: '1px',
    borderColor: 'rgba(134, 107, 171, 0.3)',
    focusBorderColor: '#cc7bc9',
    bg: '#383a4a',
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontSize: 'sm',
    _hover: { borderColor: 'rgba(134, 107, 171, 0.5)' },
    _disabled: { opacity: 0.35, cursor: 'not-allowed' },
};

const sectionLabel = {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontWeight: '700',
    fontSize: '10px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#866bab',
    mb: 3,
};

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { searchQuery, tagSearchQuery, selectedTag, currentPage } = state;

    const debouncedSearch = useDebounce(searchQuery, 1000);
    const debouncedTagSearch = useDebounce(tagSearchQuery, 500);

    const { data, isLoading, isError } = useDatablogs({
        page: currentPage,
        title: debouncedSearch,
        tag: selectedTag,
    });

    const { data: mostUsedTags = [] } = useMostUsedTags();
    const { data: searchedTags = [] } = useSearchTags(debouncedTagSearch);

    const handleSearchChange = (e) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
        if (e.target.value) dispatch({ type: 'SET_TAG_SEARCH_QUERY', payload: '' });
    };

    const handleTagSearchChange = (e) => {
        dispatch({ type: 'SET_TAG_SEARCH_QUERY', payload: e.target.value });
        if (e.target.value) dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    };

    const handleTagSelect = (tag) => dispatch({ type: 'SET_SELECTED_TAG', payload: tag });

    const handlePageChange = (page) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isSearchDisabled = tagSearchQuery.length > 0;
    const isTagSearchDisabled = searchQuery.length > 0;

    if (isError) {
        return (
            <Box minH="100vh" bg="#292b37" display="flex" alignItems="center" justifyContent="center">
                <Text fontFamily="'Outfit', system-ui, sans-serif" color="#cc7bc9" fontSize="lg">
                    Gagal memuat artikel. Coba lagi nanti.
                </Text>
            </Box>
        );
    }

    return (
        <Fragment>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Navigation />
            </motion.div>

            <Box minH="100vh" bg="#292b37" position="relative">
                {/* Star field background */}
                <StarField />

                {/* ── Hero Section ── */}
                <Box position="relative" zIndex={1}>
                    <Box py={{ base: 16, md: 24 }} borderBottomWidth="1px" borderColor="rgba(134, 107, 171, 0.15)">
                        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                {/* Heading dua baris — pola design system */}
                                <Box mb={6} lineHeight="1.2">
                                    <Heading
                                        as="h1"
                                        fontFamily="'Playfair Display', Georgia, serif"
                                        fontWeight="800"
                                        fontStyle="italic"
                                        fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                                        color="#faf9ff"
                                        display="block"
                                    >
                                        Tulisan &amp;
                                    </Heading>

                                    {/* "Labs" dengan SVG ellipse encircle */}
                                    <Box display="inline-block" position="relative" mt={1}>
                                        <Heading
                                            as="h1"
                                            fontFamily="'Playfair Display', Georgia, serif"
                                            fontWeight="800"
                                            fontStyle="italic"
                                            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                                            color="#faf9ff"
                                            display="inline"
                                        >
                                            Artikel
                                        </Heading>
                                        <Box
                                            as="svg"
                                            position="absolute"
                                            top="-8%"
                                            left="-6%"
                                            width="112%"
                                            height="116%"
                                            viewBox="0 0 100 40"
                                            preserveAspectRatio="none"
                                            overflow="visible"
                                            pointerEvents="none"
                                        >
                                            <ellipse
                                                cx="50" cy="20" rx="47" ry="18"
                                                fill="none"
                                                stroke="#cc7bc9"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Text
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    color="#c0c0c0"
                                    maxW="580px"
                                    lineHeight="1.85"
                                >
                                    Kumpulan artikel yang membahas mengenai detail teknis pengembangan sistem,
                                    bahkan pemahaman dan pandangan saya dari beberapa domain lain yang saya tuangkan berdasarkan pelajaran
                                    yang saya dapat dari berbagai sumber.
                                </Text>
                            </motion.div>
                        </Box>
                    </Box>

                    {/* ── Main Content ── */}
                    <Box maxW="7xl" mx="auto" py={{ base: 10, md: 14 }} px={{ base: 4, md: 6 }}>
                        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, md: 10 }}>

                            {/* ── Sidebar ── */}
                            <Box w={{ base: '100%', lg: '25%' }}>
                                <Box position={{ base: 'static', lg: 'sticky' }} top="6">

                                    {/* Cari Artikel */}
                                    <Box mb={7}>
                                        <Text {...sectionLabel}>Cari Artikel</Text>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <Icon as={FiSearch} color="#866bab" boxSize={4} />
                                            </InputLeftElement>
                                            <Input
                                                pl={10}
                                                onChange={handleSearchChange}
                                                value={searchQuery}
                                                placeholder="Ketik judul artikel..."
                                                isDisabled={isSearchDisabled}
                                                {...inputStyles}
                                            />
                                            {searchQuery && (
                                                <InputRightElement>
                                                    <Icon
                                                        as={FiX}
                                                        color="#866bab"
                                                        cursor="pointer"
                                                        onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })}
                                                        _hover={{ color: '#cc7bc9' }}
                                                        transition="color 0.2s"
                                                    />
                                                </InputRightElement>
                                            )}
                                        </InputGroup>
                                    </Box>

                                    {/* Cari Tag */}
                                    <Box mb={7}>
                                        <Text {...sectionLabel}>Cari Tag</Text>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <Icon as={FiSearch} color="#866bab" boxSize={4} />
                                            </InputLeftElement>
                                            <Input
                                                pl={10}
                                                value={tagSearchQuery}
                                                onChange={handleTagSearchChange}
                                                placeholder="Ketik nama tag..."
                                                isDisabled={isTagSearchDisabled}
                                                {...inputStyles}
                                            />
                                            {tagSearchQuery && (
                                                <InputRightElement>
                                                    <Icon
                                                        as={FiX}
                                                        color="#866bab"
                                                        cursor="pointer"
                                                        onClick={() => dispatch({ type: 'SET_TAG_SEARCH_QUERY', payload: '' })}
                                                        _hover={{ color: '#cc7bc9' }}
                                                        transition="color 0.2s"
                                                    />
                                                </InputRightElement>
                                            )}
                                        </InputGroup>

                                        {/* Saran tag */}
                                        {debouncedTagSearch && searchedTags.length > 0 && (
                                            <VStack
                                                align="stretch"
                                                spacing={0}
                                                mt={2}
                                                bg="#383a4a"
                                                borderRadius="xl"
                                                border="1px solid rgba(204, 123, 201, 0.35)"
                                                boxShadow="0 0 12px rgba(204, 123, 201, 0.12)"
                                                overflow="hidden"
                                            >
                                                {searchedTags.map(({ name }) => (
                                                    <Box
                                                        key={name}
                                                        px={4}
                                                        py={2.5}
                                                        color="#d0d0d0"
                                                        fontFamily="'Outfit', system-ui, sans-serif"
                                                        fontSize="sm"
                                                        cursor="pointer"
                                                        transition="all 0.18s"
                                                        _hover={{ bg: 'rgba(134, 107, 171, 0.18)', color: '#faf9ff' }}
                                                        onClick={() => handleTagSelect(name)}
                                                    >
                                                        {name}
                                                    </Box>
                                                ))}
                                            </VStack>
                                        )}
                                    </Box>

                                    {/* Tag Terpopuler */}
                                    <Box>
                                        <Text {...sectionLabel}>Tag Terpopuler</Text>
                                        <VStack align="stretch" spacing={1.5}>
                                            <Button
                                                variant="ghost"
                                                bg={selectedTag === '' ? '#866bab' : 'transparent'}
                                                color={selectedTag === '' ? '#faf9ff' : '#c0c0c0'}
                                                _hover={{
                                                    bg: selectedTag === '' ? '#866bab' : 'rgba(134, 107, 171, 0.14)',
                                                    color: '#faf9ff',
                                                }}
                                                borderRadius="xl"
                                                justifyContent="flex-start"
                                                onClick={() => handleTagSelect('')}
                                                size="sm"
                                                isDisabled={isSearchDisabled}
                                                fontFamily="'Outfit', system-ui, sans-serif"
                                                fontWeight={selectedTag === '' ? '600' : '400'}
                                                fontSize="sm"
                                                px={4}
                                                transition="all 0.2s ease"
                                            >
                                                Semua
                                            </Button>

                                            {mostUsedTags.map(({ name }) => (
                                                <Button
                                                    key={name}
                                                    variant="ghost"
                                                    bg={selectedTag === name ? '#866bab' : 'transparent'}
                                                    color={selectedTag === name ? '#faf9ff' : '#c0c0c0'}
                                                    _hover={{
                                                        bg: selectedTag === name ? '#866bab' : 'rgba(134, 107, 171, 0.14)',
                                                        color: '#faf9ff',
                                                    }}
                                                    borderRadius="xl"
                                                    justifyContent="flex-start"
                                                    onClick={() => handleTagSelect(name)}
                                                    size="sm"
                                                    isDisabled={isSearchDisabled}
                                                    fontFamily="'Outfit', system-ui, sans-serif"
                                                    fontWeight={selectedTag === name ? '600' : '400'}
                                                    fontSize="sm"
                                                    px={4}
                                                    transition="all 0.2s ease"
                                                >
                                                    {name}
                                                </Button>
                                            ))}
                                        </VStack>
                                    </Box>
                                </Box>
                            </Box>

                            {/* ── Grid artikel ── */}
                            <Box w={{ base: '100%', lg: '75%' }}>
                                <LabPagination
                                    blog={data?.data || []}
                                    currentPage={data?.current_page || 1}
                                    lastPage={data?.last_page || 1}
                                    onPageChange={handlePageChange}
                                    isLoading={isLoading}
                                />
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Footer />
            </motion.div>
        </Fragment>
    );
}
