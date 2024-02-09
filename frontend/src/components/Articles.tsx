import React from 'react';

const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  
]

const Articles: React.FC = () => {
  return (
    <div className='articles'>
      <div className='articles-content'>
        {products.map((article) => (
          <div key={article.id} className='article-content'>
            <div className='image-content'>
              <img src={article.imageSrc} alt={article.imageAlt} className='image' aria-hidden="true"/>
            </div>
            <p>{article.name}</p>
            <p>{article.price} €</p>
          </div>
        ))}

      </div>

      <div className='numero-page'>
        1-2-3-4
      </div>
    </div>
  )
}

export default Articles