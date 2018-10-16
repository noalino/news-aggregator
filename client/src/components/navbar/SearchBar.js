import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../../styles/navbar/SearchBar.scss';

class SearchBar extends Component {
  state = { query: '' };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  redirectToSearch = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { query } = this.state;

    if (query !== '') {
      history.push(`/search?q=${encodeURIComponent(query)}`);
      this.setState({ query: '' });
    } else {
      history.push('/search');
    }
  }

  render() {
    const { query } = this.state;
    return (
      <form id={styles.searchbar} onSubmit={this.redirectToSearch}>
        <input
          type="search"
          name="query"
          placeholder="Search articles..."
          autoComplete="true"
          aria-label="Search articles"
          value={query}
          onChange={this.handleInputChange}
        />
        <button type="button">
          <i className="fas fa-search" />
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(SearchBar);
