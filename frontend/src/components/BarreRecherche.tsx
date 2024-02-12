import React, { useState } from 'react';
import { HiMagnifyingGlass } from "react-icons/hi2";

const BarreRecherche: React.FC = () => {

  const [recherche, setRecherche] = useState("");

  const HandleSearch = () => {
    console.log(recherche);
    setRecherche("")

  }


  return (
    <div className='recherche'>
      <input type="search" name="" id="" className='barre-recherche' placeholder='Rechercher...' onChange={(e) => setRecherche(e.target.value)} value={recherche} />

      <label htmlFor="search" className='icone-recherche-content'>
        <HiMagnifyingGlass className='icone-recherche' />
      </label>
      <input type='button' id="search" name='search' value="search" style={{ display: "none" }} onClick={HandleSearch} />





    </div>
  )
}

export default BarreRecherche