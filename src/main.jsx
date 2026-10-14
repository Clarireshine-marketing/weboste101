import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.css';
// Vanilla web components — self-register as custom elements on import.
import './vendor/cs-motion.js';
import './vendor/cs-paper.js';
import './vendor/cs-bubbles.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
