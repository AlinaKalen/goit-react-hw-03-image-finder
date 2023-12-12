import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';


const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          image={image}
          alt={image.id}
          onImageClick={onImageClick} 
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;



    
      
  