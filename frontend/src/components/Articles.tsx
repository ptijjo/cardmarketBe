"use client"
import React from 'react';
import { products } from '../data/Data';
import { useRouter } from 'next/navigation'


const Articles: React.FC = () => {
  const navigate = useRouter();

  const HandleCategorie = (data: string) => {

    navigate.push(`/categorie/${data}`)


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