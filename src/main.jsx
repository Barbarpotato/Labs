// Core Modules
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Custom Component
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <Header />
      <App />
      <Footer />
    </QueryClientProvider>
  </ChakraProvider>
)
