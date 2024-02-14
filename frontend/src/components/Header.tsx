"use client"
import React from 'react';
import BarreRecherche from '../components/BarreRecherche';
import Panier from '../components/Panier';
import Identification from '../components/Identification';
import Enregistrement from '../components/Enregistrement';
import Link from 'next/link'
import { Dispatch, Selector } from '../lib/store';
import { logout, selectUser } from '../lib/feature/user/userSlice';



const Header: React.FC = () => {

    const user = Selector(selectUser);
    const dispatch = Dispatch();
    

    const HandleDeconnection = () => {
        dispatch(logout())
    };

    const HandleProfil = () => {
        
    }

    return (
        <header className='header'>
            <div className='header-content'>
                <Link href="/" className='logo-home'>
                    <div className='logo-content'>
                        <img src="/logo/logo.png" alt="logo" className='logo' />
                    </div>
                </Link>
                <div className={(user===null)?'connection-content':"nonVisible"}>
                    <Identification />
                    <Enregistrement />
                </div>

                <div className={(user !== null) ? "userName" : "nonVisible"}>
                {user !== null &&
                    <div className='identifiant-deconnection'>
                        <Link href="/profil"><p onClick={HandleProfil}>{user.userFirstName}</p></Link>
                        <button onClick={HandleDeconnection}>Déconnection</button>

                    </div>

                }
            </div>

                <Panier />

            </div>
            <BarreRecherche />
        </header>
    )
}

export default Header