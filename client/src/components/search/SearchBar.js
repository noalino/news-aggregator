import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/search/SearchBar.scss';

const SearchBar = ({ query, onChange, className, focus }) => (
  <div className={styles[className]}>
    <input
      type="search"
      name="query"
      placeholder="Search articles..."
      autoComplete="true"
      aria-label="Search articles"
      value={query}
      onChange={onChange}
      autoFocus={focus} // eslint-disable-line jsx-a11y/no-autofocus
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
  focus: PropTypes.bool.isRequired,
};

export default SearchBar;
