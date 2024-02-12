import React from 'react'
import { useParams } from 'react-router-dom'

const Categorie: React.FC = () => {

    const categorie = JSON.stringify(useParams().id);

    console.log(categorie);


    return (
        <main className='main'>{categorie}</main>
    )
}

export default Categorie