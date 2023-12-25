import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react';
import { IdeasProvider } from './lib/context/codeSnip.jsx';
import { CodeShotsProvider } from './lib/context/codeshot.jsx';
import { dark, light } from '@clerk/themes';

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function AppWrapper() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ClerkProvider
      publishableKey={key} 
      navigate={(to) => navigate(to)}
      appearance={{
        baseTheme: theme === 'business' ? dark : light
      }} 
    >
      <CodeShotsProvider>
        <IdeasProvider>
          <App />
        </IdeasProvider>
      </CodeShotsProvider>
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);