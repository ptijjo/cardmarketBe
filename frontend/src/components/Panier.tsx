import React from 'react'
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Panier: React.FC = () => {
    return (
        <Link to="/commande" className='lien-commande'>
            <div className='panier-content' >
                <BsCart4 className='panier' />
                <span className='quantite-panier'>0</span>
            </div>
        </Link>
    )
}
export default Panier