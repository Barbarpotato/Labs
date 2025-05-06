import { Fragment, useReducer } from 'react';
import { Flex, Button, Heading, Text, Box, Input, VStack, Icon, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDatablogs, useMostUsedTags, useSearchTags } from './api/labs/GET';
import LabPagination from './components/LabPagination';
import useDebounce from './hooks/useDebounce';
import DarwinButton from './components/DarwinButton';

import { motion } from 'framer-motion';
import { Navigation, Footer } from 'personal-shared-layout';

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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchQuery, tagSearchQuery, selectedTag, currentPage } = state;

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const debouncedTagSearchQuery = useDebounce(tagSearchQuery, 500);

  const { data, isLoading, isError } = useDatablogs({
    page: currentPage,
    title: debouncedSearchQuery,
    tag: selectedTag,
  });

  const { data: mostUsedTags = [] } = useMostUsedTags();
  const { data: searchedTags = [] } = useSearchTags(debouncedTagSearchQuery);

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
    if (e.target.value) {
      dispatch({ type: 'SET_TAG_SEARCH_QUERY', payload: '' }); // Clear tag search if article search is active
    }
  };

  const handleTagSearchChange = (e) => {
    dispatch({ type: 'SET_TAG_SEARCH_QUERY', payload: e.target.value });
    if (e.target.value) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: '' }); // Clear article search if tag search is active
    }
  };

  const handleTagSelect = (tag) => {
    dispatch({ type: 'SET_SELECTED_TAG', payload: tag });
  };

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  };

  const clearTagSearch = () => {
    dispatch({ type: 'SET_TAG_SEARCH_QUERY', payload: '' });
  };

  if (isError) return <Text textAlign="center" color="red">Failed to load blogs.</Text>;

  const isSearchDisabled = tagSearchQuery.length > 0; // Disable article search if tag search is active
  const isTagSearchDisabled = searchQuery.length > 0; // Disable tag search if article search is active

  return (
    <Fragment>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Navigation />
      </motion.div>

      <Box minH="100vh" bg="#292b37" py={20}>

        {/* Hero Section */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box py={{ base: 8, md: 12 }} borderBottomWidth={1} borderColor="#536189">
            <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
              <Heading as="h1" size={{ base: 'xl', md: '2xl' }} color="#faf9ff" mb={4}>
                Labs
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="#faf9ff" maxW="2xl">
                Technical articles, tutorials, and insights about web development and software engineering.
              </Text>
            </Box>
          </Box>
        </motion.div>

        {/* Main Content */}
        <Box maxW="7xl" mx="auto" py={{ base: 8, md: 12 }} px={{ base: 4, md: 6 }}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 6, md: 8 }}>
            {/* Sidebar */}
            <Box w={{ base: '100%', lg: '25%' }}>
              <Box position={{ base: 'static', lg: 'sticky' }} top="6" py={4}>

                {/* Article Search */}
                <Box mb={6}>
                  <Heading as="h2" size="sm" color="#faf9ff" mb={3}>
                    Search Articles
                  </Heading>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiSearch} color="#faf9ff" boxSize={5} />
                    </InputLeftElement>
                    <Input
                      pl={10}
                      onChange={handleSearchChange}
                      value={searchQuery}
                      placeholder="Search articles..."
                      color="#faf9ff"
                      _placeholder={{ color: '#faf9ff', opacity: 0.7 }}
                      borderRadius="md"
                      borderWidth={3}
                      borderColor="#536189"
                      focusBorderColor="#ff79c6"
                      bg="#292b37"
                      size={{ base: "md", md: "lg" }}
                      isDisabled={isSearchDisabled}
                    />
                    {searchQuery && (
                      <InputRightElement>
                        <Icon as={FiX} color="#faf9ff" cursor="pointer" onClick={clearSearch} />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </Box>

                {/* Tag Search */}
                <Box>
                  <Heading as="h2" size="sm" color="#faf9ff" mb={3}>
                    Tags
                  </Heading>
                  <Box mb={4}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiSearch} color="#faf9ff" boxSize={5} />
                      </InputLeftElement>
                      <Input
                        pl={10}
                        value={tagSearchQuery}
                        onChange={handleTagSearchChange}
                        placeholder="Search tags..."
                        color="#faf9ff"
                        _placeholder={{ color: '#faf9ff', opacity: 0.7 }}
                        borderRadius="md"
                        borderWidth={3}
                        borderColor="#536189"
                        focusBorderColor="#ff79c6"
                        bg="#292b37"
                        size={{ base: "md", md: "lg" }}
                        isDisabled={isTagSearchDisabled}
                      />
                      {tagSearchQuery && (
                        <InputRightElement>
                          <Icon as={FiX} color="#faf9ff" cursor="pointer" onClick={clearTagSearch} />
                        </InputRightElement>
                      )}
                    </InputGroup>
                  </Box>

                  {debouncedTagSearchQuery && searchedTags.length > 0 && (
                    <VStack
                      align="stretch"
                      spacing={1}
                      mb={4}
                      bg="#1e2130"
                      p={2}
                      borderRadius="md"
                      border="1px solid #ff79c6"
                      boxShadow="0 0 10px rgba(255, 121, 198, 0.4)"
                    >
                      {searchedTags.map(({ name }) => (
                        <Box
                          key={name}
                          p={2}
                          color="#faf9ff"
                          _hover={{
                            bg: '#ff79c6',
                            color: '#1e2130',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                          borderRadius="md"
                          transition="all 0.2s"
                          onClick={() => handleTagSelect(name)}
                        >
                          {name}
                        </Box>
                      ))}
                    </VStack>
                  )}

                  <VStack align="stretch" spacing={2}>
                    <Heading as="h2" size="sm" color="#faf9ff" mb={3}>
                      Most Used Tags
                    </Heading>
                    <Button
                      variant={selectedTag === '' ? 'solid' : 'outline'}
                      bg={selectedTag === '' ? '#ff79c6' : '#292b37'}
                      color="#faf9ff"
                      _hover={{ bg: selectedTag === '' ? '#ff79c6' : '#536189' }}
                      borderColor={selectedTag === '' ? '#ff79c6' : '#536189'}
                      justifyContent="flex-start"
                      onClick={() => handleTagSelect('')}
                      size={{ base: "sm", md: "md" }}
                      isDisabled={isSearchDisabled}
                    >
                      All
                    </Button>
                    {mostUsedTags.map(({ name }) => (
                      <Button
                        key={name}
                        variant={selectedTag === name ? 'solid' : 'outline'}
                        bg={selectedTag === name ? '#ff79c6' : '#292b37'}
                        color="#faf9ff"
                        _hover={{ bg: selectedTag === name ? '#ff79c6' : '#536189' }}
                        borderColor={selectedTag === name ? '#ff79c6' : '#536189'}
                        justifyContent="flex-start"
                        onClick={() => handleTagSelect(name)}
                        size={{ base: "sm", md: "md" }}
                        isDisabled={isSearchDisabled}
                      >
                        {name}
                      </Button>
                    ))}
                  </VStack>
                </Box>
              </Box>
            </Box>

            {/* Blog Grid and Pagination */}
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

      <DarwinButton />

      {/* Footer transition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Footer />
      </motion.div>

    </Fragment>
  );
}
