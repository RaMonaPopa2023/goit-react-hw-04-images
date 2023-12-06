import React, { useState, useEffect, useCallback } from 'react';
import ImageGallery from './ImageGallery';
import ImageService from './ImageService';
import ErrorAlert from './ErrorAlert';
import SearchBar from './SearchBar';
import Loading from './Loading';
import { debounce } from 'lodash';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleImages, setVisibleImages] = useState(12);
  const [perPage] = useState(20);
  const [totalHits, setTotalHits] = useState(0);

  const retrieveArticles = useCallback(
    async (page = 1) => {
      let uniqueArticles = [];
      try {
        setIsLoading(true);
        const { hits, totalHits } = await ImageService.retrieveArticles(
          searchTerm,
          page,
          perPage
        );

        if (hits.length === 0) {
          setError('Nu a fost gasit rezultatul.');
        } else {
          uniqueArticles = hits.filter(article =>
            articles.every(existingArticle => existingArticle.id !== article.id)
          );
        }

        setArticles(prevArticles =>
          page === 1 ? uniqueArticles : [...prevArticles, ...uniqueArticles]
        );
        setTotalHits(totalHits);
      } catch (error) {
        switch (error.code) {
          case 'ERR_BAD_REQUEST':
            setError('Nu a fost gasit rezultatul');
            break;
          default:
            setError('A aparut o eroare.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [articles, searchTerm, perPage]
  );

  useEffect(() => {
    const triggerSearch = debounce(async () => {
      setArticles([]);
      setError('');
      setIsLoading(true);
      setTotalHits(0);
      await retrieveArticles();
      setIsLoading(false);
    }, 500);

    triggerSearch();
  }, [searchTerm, retrieveArticles]);

  const loadMore = async () => {
    const nextPage = Math.ceil((visibleImages + perPage) / perPage);

    if (visibleImages < totalHits) {
      setVisibleImages(prevVisibleImages => prevVisibleImages + perPage);
      await retrieveArticles(nextPage);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SearchBar
        handleChange={newSearchTerm => setSearchTerm(newSearchTerm)}
        retrieveArticles={retrieveArticles}
        searchTerm={searchTerm}
      />
      {error?.length > 0 && <ErrorAlert errors={error} />}
      {articles.length > 0 && (
        <ImageGallery
          articles={articles}
          loadMore={loadMore}
          visibleImages={visibleImages}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default App;
