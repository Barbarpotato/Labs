// Core Modules
import { QueryClient, QueryClientProvider } from 'react-query';
import { Darwin } from "personal-shared-layout"
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <Darwin />
      <App />
    </QueryClientProvider>
  </ChakraProvider>
)
