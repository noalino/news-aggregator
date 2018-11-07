import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/search/SearchBar.scss';

const SearchBar = ({ query, onChange, className }) => (
  <div className={styles[className]}>
    <input
      type="text"
      name="query"
      placeholder="Search articles..."
      autoComplete="true"
      aria-label="Search articles"
      value={query}
      onChange={onChange}
    />
    <button type="submit">
      <i className="fas fa-search" />
    </button>
  </div>
);

SearchBar.defaultProps = {
  query: '',
};

SearchBar.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default SearchBar;
