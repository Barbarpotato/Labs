
import { Flex, Heading, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

function Header() {

    const router = useRouter();

    // Define colors
    const primaryFontColor = '#faf9ff';
    const secondaryColor = '#bd93f9';

    return (
        <Flex
            id="navigation"
            p={{ base: 2, md: 10 }} // Responsive padding
            alignItems="center"
            gap={2}
        >
            {/* Logo Section */}
            <Flex p={2}>
                <a href='https://barbarpotato.github.io'>
                    <Heading
                        cursor="pointer"
                        fontSize="2xl"
                        color={primaryFontColor}
                    >
                        <span style={{ color: secondaryColor, fontWeight: 'bold' }}>
                            🚀D
                        </span>
                        armawan
                    </Heading>
                </a>
            </Flex>
            <Spacer />

            {/* Navigation Links */}
            <Flex>
                {/* Default route links */}
                <Flex
                    display={{ base: 'none', md: 'flex' }} // Only show on medium screens and above
                >

                    <Fragment>

                        {
                            router.asPath === '/' ? (
                                <Heading
                                    className="navbar"
                                    mx={6}
                                    fontWeight="small"
                                    color={primaryFontColor}
                                    size="md"
                                >
                                    <a href="https://barbarpotato.github.io/">Home</a>
                                </Heading>
                            ) : (
                                <Heading
                                    className="navbar"
                                    mx={6}
                                    fontWeight="small"
                                    color={primaryFontColor}
                                    size="md"
                                >
                                    <a href="/Labs">Labs</a>
                                </Heading>
                            )
                        }
                    </Fragment>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Header