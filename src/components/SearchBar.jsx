import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

const SearchBar = ({ searchTerm, handleChange, retrieveArticles }) => {
  const handleInputChange = evt => {
    const newSearchTerm = evt.target.value;
    handleChange(newSearchTerm);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    retrieveArticles(searchTerm);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <input
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={searchTerm}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  retrieveArticles: PropTypes.func.isRequired,
};

export default SearchBar;
