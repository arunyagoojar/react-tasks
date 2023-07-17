import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      // Successful registration
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      // Failed registration, service worker won’t be installed
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
