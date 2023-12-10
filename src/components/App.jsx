import React, { useState, useEffect, useRef } from 'react';
import fetchImages from './api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const prevPageRef = useRef();

  useEffect(() => {
    prevPageRef.current = page;
  }, [page]);

  const prevPage = prevPageRef.current;

  useEffect(() => {
    const fetchImagesAndUpdateState = async () => {
      if (!searchQuery) return;
      

      setIsLoading(true);

      try {
        const hits = await fetchImages(searchQuery, page);
        if (page === 1) {
          setImages(hits);
        } else {
          setImages((prevImages) => [...prevImages, ...hits]);
        }

       const nextPageLoadMore = page < Math.ceil(hits.totalHits / 12);
      setLoadMore(nextPageLoadMore);

      console.log('loadMore:', nextPageLoadMore);
    } finally {
      setIsLoading(false);
    }
  };

    if (page !== prevPage || searchQuery !== prevPage) {
      fetchImagesAndUpdateState();
    }
  }, [searchQuery, page, prevPage]);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setImages([]);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {selectedImage && (
        <Modal isOpen={true} largeImageURL={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
