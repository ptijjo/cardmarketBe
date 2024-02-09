
import React from 'react';
import { BsCart4 } from "react-icons/bs";


const Header = () => {

    return (
        <header className='header'>
            <div className='logo-content'>
                <img src="/logo/logo.jpg" alt="logo" className='logo' />
            </div>
            <div className='identifiant-content'>
                <div className='identification'>Se connecter </div>
                <p>|</p>
                <p className='identification'>S'enregistrer</p>
            </div>

            <div className='panier-content'>
                <BsCart4 className='panier' />
                <span className='quantite-panier'>0</span>
            </div>
        </header>
    )
}

export default Header