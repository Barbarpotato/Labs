import React, { useEffect, useState } from 'react'
import {
    Drawer, Button, Input, Text,
    DrawerBody,
    DrawerFooter, Box,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Flex,
    Heading,
} from '@chakra-ui/react'

// fetch post data from api
const fetchData = async (message = "", history = [], content = "") => {

    // remove the message property from the history
    const filteredHistory = history.map((item) => ({
        ...item,
        message: undefined
    }))

    const response = await fetch("https://darwin-assistant.vercel.app/api/v1/conversation/labs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            history: filteredHistory,
            content: content,
            message: message
        })
    })

    const data = await response.json()

    return data
}


function Darwin({ btnRef, isOpen, onOpen, onClose, content }) {

    const [message, setMessage] = useState([])
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        const data = await fetchData("", history, content)
        setHistory((prev) => [...prev,
        {
            role: "user",
            parts: [{ text: "" }],
            message: ""
        },
        {
            role: "model",
            parts: [{ text: data.response }],
            message: data.response
        }])
    }, [])

    const handleSendMessage = async () => {
        if (!message.trim()) return; // Prevent sending empty messages

        setLoading(true); // Disable input while waiting for response
        setHistory((prev) => [
            ...prev,
            {
                role: "user",
                parts: [{ text: message }],
                message: message,
            },
            {
                role: "model",
                parts: [{ text: "Thinking..." }], // Temporary "typing" effect
                message: "Typing...",
            },
        ]);

        // Clear the input field
        setMessage("");

        const data = await fetchData(message, history, content);

        // Replace "..." with actual response
        setHistory((prev) => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = {
                role: "model",
                parts: [{ text: data.response }],
                message: data.response,
            };
            return newHistory;
        });
        setLoading(false);
    };

    return (
        <Drawer
            blockScrollOnMount={false}
            size={"lg"}
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Heading color={"#ff79c6"} size={"md"}>
                        Conversation With Darwin
                    </Heading>
                </DrawerHeader>
                <DrawerBody>
                    {history.map((message, index) => (
                        message.message ? (
                            <Flex
                                key={index}
                                direction="column"
                                align={message.role === "model" ? "flex-start" : "flex-end"} // Align left for model, right for user
                            >
                                <Box
                                    mb={4}
                                    p={3}
                                    borderRadius="md"
                                    bg={message.role === "model" ? "#2D3748" : "#4A5568"}
                                    color="white"
                                    width="85%"
                                    transition="all 0.2s ease-in-out"
                                    _hover={{
                                        bg: message.role === "model" ? "#394150" : "#5A6478", // Slightly lighter on hover
                                        transform: "scale(1.02)", // Slight zoom effect
                                        boxShadow: "md", // Adds a subtle shadow
                                    }}
                                >
                                    <Text fontWeight="bold" color="#ff79c6">
                                        {message.role === "model" ? "Darwin" : "You"}
                                    </Text>
                                    <Text mt={1}>{message.message}</Text>
                                </Box>
                            </Flex>
                        ) : null
                    ))}
                </DrawerBody>

                <DrawerFooter>
                    <Flex width={"100%"}>
                        <Input
                            value={message}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                            onChange={(e) => setMessage(e.target.value)} isDisabled={loading}
                            borderLeftRadius={'2xl'} borderRightRadius={0} borderWidth={3} colorScheme='purple' borderColor={"#536189"} focusBorderColor={"#ff79c6"}
                            my={2} placeholder='Send a message...' />
                    </Flex>

                    <Button borderLeftRadius={0} colorScheme='purple' my={2} onClick={handleSendMessage}
                        isLoading={loading} // Show loading indicator
                        loadingText="Sending..."
                    >Send</Button>


                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Darwin