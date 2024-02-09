
import React from 'react';
import BarreRecherche from '../components/BarreRecherche';
import Panier from '../components/Panier';
import Identification from '../components/Identification';
import Enregistrement from '../components/Enregistrement';
import { Link } from "react-router-dom";


const Header: React.FC = () => {

    return (
        <header className='header'>
            <div className='header-content'>
                <Link to="/" className='logo-home'>
                    <div className='logo-content'>
                        <img src="src/assets/logo/logo.jpg" alt="logo" className='logo' />
                    </div>
                </Link>
                <Identification />
                <Enregistrement />
                <Panier />

            </div>
            <BarreRecherche />
        </header>
    )
}

export default Header