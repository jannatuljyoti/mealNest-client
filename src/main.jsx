import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import { router } from './router/Router.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <div className='font-roboto max-w-7xl mx-auto '>
   <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
   </QueryClientProvider>
  </div>
  </StrictMode>,
)
