import React from 'react'


const Categorie = ({params}:{params:{slug:string}}) => {
    return (
        <main className='main'>{params.slug}</main>
    )
}

export default Categorie