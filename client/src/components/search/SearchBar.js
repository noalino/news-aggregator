import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuery } from '../../_utils';
import styles from '../../styles/search/SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    const { location: { search } } = this.props;
    this.state = {
      // Initialize query to the one from nav searchbar or URL if it exists
      query: getQuery(search),
    };
  }

  handleInputChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    const { onChange } = this.props;
    this.setState({ [name]: value }, () => onChange(e));
  }

  render() {
    const { query } = this.state;
    return (
      <div className={styles.searchBar}>
        <input
          type="search"
          name="query"
          placeholder="Search articles..."
          autoComplete="true"
          aria-label="Search articles"
          value={query}
          onChange={this.handleInputChange}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withRouter(SearchBar);
