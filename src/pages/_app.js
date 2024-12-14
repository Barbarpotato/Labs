// pages/_app.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../styles/globals.css';  // Import global CSS here
import { ChakraProvider } from "@chakra-ui/react";
import Link from 'next/link';  // Import Link component from Next.js

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            {/* Navigation Bar */}
            <Header />

            {/* Render the current page */}
            <Component {...pageProps} />

            {/* Footer */}
            <Footer />

        </ChakraProvider>
    );
}

export default MyApp;
