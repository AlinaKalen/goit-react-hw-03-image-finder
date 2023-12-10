const fetchImages = async (query, page) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=40313621-9143b56d57bfc999f5bdb1732&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

export default fetchImages;