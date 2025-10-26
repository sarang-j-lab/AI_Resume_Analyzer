import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ResumeFeedbackProvider from './Context/FeedbackContext/ResumeFeedbackProvider.tsx'
import DisableContextProvider from './Context/ButtonDisableContext/DisableContextProvider.js'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ResumeFeedbackProvider>
      <DisableContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </DisableContextProvider>
    </ResumeFeedbackProvider>
  </BrowserRouter>
)
