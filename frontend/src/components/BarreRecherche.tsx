import React from 'react';
import { HiMagnifyingGlass } from "react-icons/hi2";

const BarreRecherche: React.FC = () => {
  return (
    <div className='recherche'>
      <input type="search" name="" id="" className='barre-recherche' placeholder='Rechercher...' />
      <div className='icone-recherche-content'>
        <HiMagnifyingGlass className='icone-recherche' />
      </div>

    </div>
  )
}

export default BarreRecherche