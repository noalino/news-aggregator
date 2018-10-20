/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateOptions } from '../../actions/articlesActions';
import { getQuery, isEqual } from '../../_utils';

import SearchBar from './SearchBar';
import Options from './Options';
import Sort from './Sort';
import styles from '../../styles/search/SearchForm.scss';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    const { location: { search } } = this.props;
    this.state = {
      // Initialize query to the one from nav searchbar or URL if it exists
      query: getQuery(search),
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { options, updateOptions, sortChange } = this.props;
    const newOptions = { ...options, [name]: value };

    if (name === 'query') {
      this.setState({ [name]: value });
    } else if (name === 'sorting') {
      sortChange(newOptions);
    } else {
      updateOptions(newOptions);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    const { options, location, history } = this.props;

    // Avoid pushing when query is empty OR options don't change (makes navigation easier)
    if (query || !isEqual(options, location.state)) {
      history.push(`${location.pathname}?q=${encodeURIComponent(query)}`, options);
    }
  }

  render() {
    const { location } = this.props;
    const lastQuery = getQuery(location.search);

    return (
      <form className={styles.header} role="search" onSubmit={this.onSubmit}>
        <SearchBar key={location.search} onChange={this.handleInputChange} />
        <Options onChange={this.handleInputChange} />
        {lastQuery && <Sort onChange={this.handleInputChange} />}
      </form>
    );
  }
}

SearchForm.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  updateOptions: PropTypes.func.isRequired,
  sortChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  options: state.articles.options,
});

export default withRouter(connect(mapStateToProps, { updateOptions })(SearchForm));
