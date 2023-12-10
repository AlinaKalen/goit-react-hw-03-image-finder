import React from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';


const ImageGallery = ({ images, onImageClick }) => {
 
  return (
    <ul className={css.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          imageUrl={image.webformatURL}
          image={image}
          alt={image.id}
          onImageClick={onImageClick} />
      ))}
    </ul>
  );
};



export default ImageGallery;
