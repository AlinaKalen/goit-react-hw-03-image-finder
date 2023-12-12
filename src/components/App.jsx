import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
    setHasMoreImages(true);
    fetchImages(searchQuery, 1);
  };

  const fetchImages = async (searchQuery, page) => {
    setIsLoading(true);

    try {
      const API_KEY = '40313621-9143b56d57bfc999f5bdb1732';
      const perPage = 12;
      const apiUrl = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const { hits, totalHits } = data;

      setImages((prevImages) => [...prevImages, ...hits]);
      setCurrentPage((prevPage) => prevPage + 1);
      setHasMoreImages(currentPage < Math.ceil(totalHits / perPage));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMoreImages) {
      fetchImages(query, currentPage);
    }
  };

  const openModal = (largeURL) => {
    setLargeImageURL(largeURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && (
        <div >
          <Loader />
        </div>
      )}
      {images.length > 0 && hasMoreImages && !isLoading && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
      {showModal && (
        <Modal isOpen={true} largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;