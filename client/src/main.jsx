import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { HifzProvider } from './context/HifzContext';
import App from './App.jsx';
import './styles/global.css';

import en from './i18n/en.json';
import ur from './i18n/ur.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ur: { translation: ur } },
  lng: localStorage.getItem('nq_lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <HifzProvider>
              <App />
              <Toaster position="top-right" />
            </HifzProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
