import React from 'react';
import PropTypes from 'prop-types';

import stylesNav from '../../styles/navbar/SearchNav.scss';
import stylesSearch from '../../styles/search/SearchBar.scss';

const SearchBar = ({ query, onChange, parent }) => (
  <div className={parent === 'search' ? stylesSearch.search : stylesNav.search}>
    <input
      type="text"
      name="query"
      placeholder="Search articles..."
      autoComplete="true"
      aria-label="Search articles"
      value={query}
      onChange={onChange}
      // autoFocus // eslint-disable-line
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
  parent: PropTypes.string.isRequired,
};

export default SearchBar;
