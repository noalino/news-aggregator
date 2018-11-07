import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../search/SearchBar';

class SearchNav extends Component {
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
      history.push(`/search?q=${encodeURIComponent(query)}&sortBy=date`);
      this.setState({ query: '' });
    } else {
      history.push('/search');
    }
  }

  render() {
    const { query } = this.state;
    return (
      <form onSubmit={this.redirectToSearch}>
        <SearchBar className="nav" query={query} onChange={this.handleInputChange} />
      </form>
    );
  }
}

SearchNav.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(SearchNav);
