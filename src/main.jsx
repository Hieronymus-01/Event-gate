import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './Contexts/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ToastProvider>
            <App />
        </ToastProvider>
    </BrowserRouter>
);