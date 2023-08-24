import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { App } from './App.tsx';
import { worker } from './mocks/browser.ts';
import { designSystem } from './styles/designSystem.ts';
import './styles/index.css';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={designSystem}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
