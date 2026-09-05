import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register Service Worker for offline PWA operation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('PRAVAHA ServiceWorker registration successful with scope: ', registration.scope);
      },
      (err) => {
        console.log('PRAVAHA ServiceWorker registration failed: ', err);
      }
    );
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
