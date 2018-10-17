/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchArticles, updateOptions, fetchSources, resetArticles } from '../../actions/articlesActions';
import { getQuery, isEqual } from '../../_utils';

import Buttons from '../sidebar/Buttons';
import Articles from '../articles/Articles';
import Footer from './Footer';
import styles from '../../styles/layout/Search.scss';

export class Search extends Component {
  constructor(props) {
    super(props);
    const { location: { search } } = this.props;
    this.state = {
      // Initialize query to the one from nav searchbar or URL if it exists
      query: search ? decodeURIComponent(getQuery(search)) : '',
    };
  }

  componentDidMount() {
    const { query } = this.state;
    const { country, language, fetchSources, searchArticles } = this.props;
    console.log('Search component mounting');

    fetchSources({ country, language });

    if (query !== '') {
      const { pageSize, options } = this.props;
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
    const decodedQuery = search ? decodeURIComponent(getQuery(search)) : '';

    this.setState({ query: decodedQuery }, () => {
      updateOptions(options);
      return (
        decodedQuery !== ''
          ? searchArticles({
            query: this.state.query,
            options,
            pageSize,
            language,
          }) : resetArticles()
      );
    });
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
    const { lastQuery, options, location, history } = this.props;

    // Avoid pushing when query & options don't change (makes navigation easier)
    if (query !== '' && (query !== lastQuery || !isEqual(options, location.state))) {
      history.push(`${location.pathname}?q=${encodeURIComponent(query)}`, options);
    }
  }

  render() {
    const { query } = this.state;
    const { lastQuery, sources, options } = this.props;

    return (
      <div className={styles.showcase}>
        <form className={styles.header} role="search" onSubmit={this.onSubmit}>
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
            <button type="button">
              <i className="fas fa-search" />
            </button>
          </div>

          <div className={styles.options}>
            <div>
              <label htmlFor="from">
                From:
                <input type="date" name="from" id="from" value={options.from} onChange={this.handleInputChange} />
              </label>
            </div>
            <div>
              <label htmlFor="to">
                To:
                <input type="date" name="to" id="to" value={options.to} onChange={this.handleInputChange} />
              </label>
            </div>
            <div>
              <label htmlFor="source">
                Source:
                <select name="source" id="source" value={options.source} onChange={this.handleInputChange} size="1">
                  <option value="">All</option>
                  {sources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
                </select>
              </label>
            </div>
          </div>

          {lastQuery !== ''
          && (
            <div className={styles.sort}>
              <h3>
                Results for:
                {` ${lastQuery}`}
              </h3>
              <div>
                <label htmlFor="sorting">
                  Sort by:
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
  lastQuery: PropTypes.string.isRequired,
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
  lastQuery: state.articles.lastQuery,
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
