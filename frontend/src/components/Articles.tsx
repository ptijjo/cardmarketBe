import React from 'react';
import { products } from '../data/Data';
import { useNavigate } from 'react-router-dom';


const Articles: React.FC = () => {
  const navigate = useNavigate();

  const HandleCategorie = (data: string) => {

    navigate(`/categorie/${data}`)


  }


  return (
    <div className='articles'>
      {products.map((article) => (
        <div key={article.id} className='article-content' onClick={() => HandleCategorie(article.name)}>
          <div className='image-content'>
            <img src={article.imageSrc} alt={article.imageAlt} className='image' aria-hidden="true" />
          </div>
          <p>{article.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Articles