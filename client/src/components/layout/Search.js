/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles, updateOptions, fetchSources, resetArticles } from '../../actions/articlesActions';
import { getQuery, isEqual } from '../../_utils';

import SearchBar from '../search/SearchBar';
import Options from '../search/Options';
import Sort from '../search/Sort';
import Buttons from '../sidebar/Buttons';
import Articles from '../articles/Articles';
import Footer from './Footer';
import styles from '../../styles/layout/Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    const { location: { search } } = this.props;
    this.state = {
      // Initialize query to the one from nav searchbar or URL if it exists
      query: getQuery(search),
    };
  }

  componentDidMount() {
    const { query } = this.state;
    const {
      country,
      language,
      fetchSources,
    } = this.props;
    console.log('Search component mounting');

    fetchSources({ country, language });

    if (query) {
      const { searchArticles, pageSize, options } = this.props;
      searchArticles({
        query,
        options,
        pageSize,
        language,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { country, language, fetchSources, location, options } = this.props;
    const { search, state } = location;
    const { search: prevLocSearch, state: prevLocState } = prevProps.location;

    // Fetch source list & reset source when language changes
    if (country !== prevProps.country) {
      console.log('language changed');
      fetchSources({ country, language });
      this.handleReqChange({ ...options, source: '' });

    // Handle query coming from nav searchbar or from URL
    } else if (state === undefined && search !== prevLocSearch) {
      console.log('nav searchbar request');
      this.handleReqChange(options);

    // Handle query coming from main searchbar
    } else if (state !== undefined && (search !== prevLocSearch || !isEqual(state, prevLocState))) {
      console.log('main searchbar request');
      this.handleReqChange(state);
    }
  }

  componentWillUnmount() {
    this.props.resetArticles();
  }

  // Search articles if query !== ''
  handleReqChange = (options) => {
    const {
      searchArticles,
      updateOptions,
      resetArticles,
      location: { search },
      language,
      pageSize,
    } = this.props;
    const query = getQuery(search);

    updateOptions(options);

    return query ? (
      searchArticles({
        query,
        options,
        pageSize,
        language,
      })
    ) : resetArticles();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { options, updateOptions } = this.props;
    const newOptions = { ...options, [name]: value };

    if (name === 'query') {
      this.setState({ [name]: value });
    } else if (name === 'sorting') {
      this.handleReqChange(newOptions);
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
      <div className={styles.showcase}>
        <form className={styles.header} role="search" onSubmit={this.onSubmit}>
          <SearchBar key={location.search} onChange={this.handleInputChange} />
          <Options onChange={this.handleInputChange} />
          {lastQuery && <Sort onChange={this.handleInputChange} />}
        </form>

        <Buttons />
        <Articles />
        <Footer />
      </div>
    );
  }
}

Search.propTypes = {
  country: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  searchArticles: PropTypes.func.isRequired,
  fetchSources: PropTypes.func.isRequired,
  resetArticles: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  pageSize: PropTypes.number.isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  updateOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  country: state.articles.country.code,
  language: state.articles.country.language.code,
  pageSize: state.articles.pageSize,
  options: state.articles.options,
});

export default connect(mapStateToProps, {
  searchArticles,
  updateOptions,
  fetchSources,
  resetArticles,
})(Search);
