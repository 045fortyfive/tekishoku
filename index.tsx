
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 19
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement); // Use createRoot from react-dom/client
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);