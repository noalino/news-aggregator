import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import stylesNav from '../../styles/navbar/SearchNav.scss';
import stylesSearch from '../../styles/search/SearchBar.scss';

const SearchBar = ({ query, onChange, parent, location: { state } }) => {
  const fromNav = state ? state.requestFromNav : false;
  return (
    <div className={parent === 'search' ? stylesSearch.search : stylesNav.search}>
      <input
        type="text"
        name="query"
        value={query}
        onChange={onChange}
        placeholder="Search articles..."
        aria-label="Search articles"
        autoComplete="off"
        /* Set autofocus only when request comes from navsearch */
        autoFocus={fromNav} // eslint-disable-line
      />
      <button type="submit">
        <i className="fas fa-search" />
      </button>
    </div>
  );
};

SearchBar.defaultProps = {
  query: '',
};

SearchBar.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  parent: PropTypes.string.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(SearchBar);
