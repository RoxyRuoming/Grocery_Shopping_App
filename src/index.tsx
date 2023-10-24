
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// automatically adjust by the size of the screen / base-screen is IPHONE SE
document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';
window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

