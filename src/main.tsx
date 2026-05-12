import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TutorialVoiceProvider } from './contexts/TutorialVoiceContext';
import { ThemeProvider } from './components/ThemeProvider';
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TutorialVoiceProvider>
          <App />
        </TutorialVoiceProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
