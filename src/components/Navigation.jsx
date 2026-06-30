import {
    Flex,
    IconButton,
    useDisclosure,
    VStack,
    HStack,
    Box,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
    { label: "Beranda", path: "/" },
    { label: "Tentang", path: "/About/" },
    { label: "Labs", path: "/Labs/" },
];

const WHATSAPP =
    "https://api.whatsapp.com/send/?phone=6282148282424&text&type=phone_number&app_absent=0";

function Navigation() {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [activePath, setActivePath] = useState("/");
    const [scrolled, setScrolled] = useState(false);

    const normalizePath = (p) => p.replace(/\/+$/, "") || "/";

    useEffect(() => {
        setActivePath(normalizePath(window.location.pathname));
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNav = (path) => {
        const n = normalizePath(path);
        if (n !== activePath) window.location.href = path;
        onClose();
    };

    const isActive = (path) => normalizePath(path) === activePath;

    return (
        // Single sticky wrapper — nav bar + mobile menu move together
        <Box position="sticky" top={0} zIndex={30}>
            {/* ── Nav bar ── */}
            <Flex
                as="nav"
                px={{ base: 4, md: 6, lg: 8 }}
                py={4}
                align="center"
                justify="space-between"
                bg={
                    scrolled
                        ? "rgba(41, 43, 55, 0.88)"
                        : "rgba(41, 43, 55, 0.6)"
                }
                backdropFilter="blur(16px)"
                borderBottom={
                    scrolled
                        ? "1px solid rgba(134, 107, 171, 0.22)"
                        : "1px solid transparent"
                }
                transition="background 0.3s ease, border-color 0.3s ease"
            >
                {/* ── Brand ── */}
                <Box
                    as="a"
                    href="/"
                    display="flex"
                    alignItems="center"
                    gap="2px"
                    cursor="pointer"
                    _hover={{ opacity: 0.85 }}
                    transition="opacity 0.2s ease"
                    aria-label="Home"
                >
                    <Text
                        fontFamily="'Space Grotesk', system-ui, sans-serif"
                        fontWeight="900"
                        fontSize="xl"
                        color="#faf9ff"
                        letterSpacing="-0.03em"
                        lineHeight="1"
                    >
                        DARMA
                    </Text>
                    <Text
                        fontFamily="'Space Grotesk', system-ui, sans-serif"
                        fontWeight="900"
                        fontSize="xl"
                        color="#cc7bc9"
                        letterSpacing="-0.03em"
                        lineHeight="1"
                    >
                        WAN
                    </Text>
                    <Box
                        w="5px"
                        h="5px"
                        borderRadius="full"
                        bg="#866bab"
                        ml="2px"
                        mb="2px"
                        alignSelf="flex-end"
                    />
                </Box>

                {/* ── Desktop nav links ── */}
                <HStack
                    spacing={1}
                    display={{ base: "none", lg: "flex" }}
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                >
                    {NAV_ITEMS.map(({ label, path }) => {
                        const active = isActive(path);
                        return (
                            <Box
                                key={path}
                                position="relative"
                                cursor="pointer"
                                onClick={() => handleNav(path)}
                            >
                                <Text
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    color={active ? "#cc7bc9" : "#faf9ff"}
                                    fontSize="sm"
                                    fontWeight={active ? "700" : "500"}
                                    px={4}
                                    py={2}
                                    borderRadius="full"
                                    letterSpacing="0.01em"
                                    transition="all 0.25s ease"
                                    _hover={{
                                        bg: "rgba(134, 107, 171, 0.14)",
                                        color: "#cc7bc9",
                                    }}
                                >
                                    {label}
                                </Text>
                                {active && (
                                    <Box
                                        position="absolute"
                                        bottom="-2px"
                                        left="50%"
                                        transform="translateX(-50%)"
                                        w="16px"
                                        h="2.5px"
                                        bg="#cc7bc9"
                                        borderRadius="full"
                                    />
                                )}
                            </Box>
                        );
                    })}
                </HStack>

                {/* ── Right: CTA + hamburger ── */}
                <HStack spacing={3}>
                    {/* CTA — desktop only */}
                    <Box
                        as="a"
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        display={{ base: "none", lg: "inline-flex" }}
                        alignItems="center"
                        gap={2}
                        px={5}
                        py={2}
                        borderRadius="full"
                        border="1.5px solid rgba(134, 107, 171, 0.6)"
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontWeight="600"
                        fontSize="sm"
                        color="#866bab"
                        transition="all 0.25s ease"
                        _hover={{
                            bg: "#866bab",
                            color: "#faf9ff",
                            borderColor: "#866bab",
                        }}
                    >
                        Hubungi
                        <FiArrowRight size={14} />
                    </Box>

                    {/* Hamburger — mobile */}
                    <IconButton
                        display={{ base: "inline-flex", lg: "none" }}
                        icon={
                            isOpen ? (
                                <IoMdClose size={20} />
                            ) : (
                                <GiHamburgerMenu size={20} />
                            )
                        }
                        variant="ghost"
                        color="#faf9ff"
                        onClick={onToggle}
                        aria-label="Toggle menu"
                        _hover={{ bg: "rgba(134, 107, 171, 0.15)" }}
                        transition="all 0.2s ease"
                    />
                </HStack>
            </Flex>

            {/* ── Mobile menu — rendered inside the sticky wrapper ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        style={{ display: "block" }}
                    >
                        <Box
                            bg="rgba(41, 43, 55, 0.95)"
                            backdropFilter="blur(16px)"
                            borderBottom="1px solid rgba(134, 107, 171, 0.18)"
                            display={{ lg: "none" }}
                            px={4}
                            pt={3}
                            pb={5}
                        >
                            <VStack align="stretch" spacing={1}>
                                {NAV_ITEMS.map(({ label, path }) => {
                                    const active = isActive(path);
                                    return (
                                        <Box
                                            key={path}
                                            onClick={() => handleNav(path)}
                                            cursor="pointer"
                                            px={4}
                                            py={3}
                                            borderRadius="xl"
                                            bg={
                                                active
                                                    ? "rgba(204, 123, 201, 0.1)"
                                                    : "transparent"
                                            }
                                            _hover={{
                                                bg: "rgba(134, 107, 171, 0.1)",
                                            }}
                                            transition="background 0.18s ease"
                                            display="flex"
                                            alignItems="center"
                                            gap={3}
                                        >
                                            {active ? (
                                                <Box
                                                    w="5px"
                                                    h="5px"
                                                    borderRadius="full"
                                                    bg="#cc7bc9"
                                                    flexShrink={0}
                                                />
                                            ) : (
                                                <Box w="5px" flexShrink={0} />
                                            )}
                                            <Text
                                                fontFamily="'Outfit', system-ui, sans-serif"
                                                fontSize="md"
                                                fontWeight={
                                                    active ? "700" : "500"
                                                }
                                                color={
                                                    active
                                                        ? "#cc7bc9"
                                                        : "#faf9ff"
                                                }
                                            >
                                                {label}
                                            </Text>
                                        </Box>
                                    );
                                })}

                                {/* Divider */}
                                <Box
                                    h="1px"
                                    bg="rgba(134, 107, 171, 0.12)"
                                    mx={4}
                                    my={1}
                                />

                                {/* Mobile CTA */}
                                <Box
                                    as="a"
                                    href={WHATSAPP}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    px={4}
                                    py={3}
                                    borderRadius="xl"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={2}
                                    fontFamily="'Outfit', system-ui, sans-serif"
                                    fontWeight="600"
                                    fontSize="md"
                                    color="#866bab"
                                    _hover={{
                                        bg: "rgba(134, 107, 171, 0.1)",
                                        textDecoration: "none",
                                    }}
                                    transition="background 0.18s ease"
                                >
                                    Hubungi
                                    <FiArrowRight size={15} />
                                </Box>
                            </VStack>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default Navigation;
