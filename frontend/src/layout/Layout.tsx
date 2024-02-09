import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Commande from '../pages/Commande';

const Layout: React.FC = () => {
    return (
        <div className='layout'>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/commande' element={<Commande />} />
            </Routes>
            <Footer />

        </div>
    )
}

export default Layout
