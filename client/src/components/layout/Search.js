/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchArticles, updateOptions, fetchSources, resetArticles } from '../../actions/articlesActions';
import { getQuery, isEqual } from '../../_utils';

import SearchBar from '../search/SearchBar';
import Buttons from '../sidebar/Buttons';
import Articles from '../articles/Articles';
import Footer from './Footer';
import styles from '../../styles/layout/Search.scss';

class Search extends Component {
  state = {
    query: '',
    optionsOpen: false,
  };

  componentDidMount() {
    const {
      country,
      language,
      fetchSources,
      location: { search },
    } = this.props;
    const query = getQuery(search);
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

  triggerOptions = () => {
    this.setState(prevState => ({
      optionsOpen: !prevState.optionsOpen,
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    const { options, location, history } = this.props;
    const lastQuery = getQuery(location.search);

    // Avoid pushing when query & options don't change (makes navigation easier)
    if (query !== '' && (query !== lastQuery || !isEqual(options, location.state))) {
      history.push(`${location.pathname}?q=${encodeURIComponent(query)}`, options);
    }
  }

  render() {
    const { optionsOpen } = this.state;
    const { sources, options, location } = this.props;
    const lastQuery = getQuery(location.search);

    return (
      <div className={styles.showcase}>
        <form className={styles.header} role="search" onSubmit={this.onSubmit}>
          <SearchBar key={location.search} onChange={this.handleInputChange} />

          <div className={styles.options_container}>
            <button type="button" className={styles.optionsBtn} onClick={this.triggerOptions}>
              {optionsOpen ? 'Hide ' : 'Show '}
              Advanced Search
            </button>
            {optionsOpen && (
              <div className={styles.options}>
                <div>
                  <label htmlFor="from">
                    <p>From:</p>
                    <input type="date" name="from" id="from" value={options.from} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div>
                  <label htmlFor="to">
                    <p>To:</p>
                    <input type="date" name="to" id="to" value={options.to} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div>
                  <label htmlFor="source">
                    <p>Source:</p>
                    <select name="source" id="source" value={options.source} onChange={this.handleInputChange} size="1">
                      <option value="">All</option>
                      {sources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            )}
          </div>

          {lastQuery && (
            <div className={styles.sort}>
              <h3>
                Results for:
                {` ${lastQuery}`}
              </h3>
              <div>
                <label htmlFor="sorting">
                  <p>Sort by:</p>
                  <select name="sorting" id="sorting" value={options.sorting} size="1" onChange={this.handleInputChange}>
                    <option value="publishedAt">Published At</option>
                    <option value="relevancy">Relevancy</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </label>
              </div>
            </div>
          )}
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
  sources: PropTypes.instanceOf(Array).isRequired,
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
  sources: state.articles.sources,

  pageSize: state.articles.pageSize,
  options: state.articles.options,
});

export default withRouter(connect(mapStateToProps, {
  searchArticles,
  updateOptions,
  fetchSources,
  resetArticles,
})(Search));
