
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {CookiesProvider} from 'react-cookie';

createRoot(document.getElementById("root")!).render(
  <CookiesProvider defaultSetOptions={{path:'/'}}>
    <App />
  </CookiesProvider>
    
  
);
