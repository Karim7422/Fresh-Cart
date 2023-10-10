import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './Components/ui/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <>
    <main style={{flexGrow:"1"}} className='custom_style '>
        <App />
    </main>
    <Toaster/>
    <Footer />
    </>
);
