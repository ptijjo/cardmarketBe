import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Commande from '../pages/Commande';
import Categorie from '../pages/Categorie';
import Profil from '../pages/Profil';

const Layout: React.FC = () => {
    return (
        <div className='layout'>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/commande' element={<Commande />} />
                <Route path='categorie/:id' element={<Categorie />} />
                <Route path='profil' element={<Profil />} />
            </Routes>
            <Footer />

        </div>
    )
}

export default Layout
