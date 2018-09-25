import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles, fetchSources, resetArticles } from '../../actions/newsActions';
import { getQuery, isEqual } from '../../_utils';

import Buttons from '../sidebar/Buttons';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Search.scss';

export class Search extends Component {
  constructor(props) {
    super(props);
    const { search } = this.props.location;
    this.state = {
      // Initialize query to the one from nav searchbar or URL if it exists
      query: search ? decodeURIComponent(getQuery(search)) : '',
      options: { ...this.props.options }
    }
  }

  static defaultProps = {
    options: {
      from: '',
      to: '',
      source: '',
      sorting: 'publishedAt'
    }
  }

  componentDidMount() {
    const { country, fetchSources, searchArticles } = this.props;
    console.log('Search component mounting');

    fetchSources(country);

    if (this.state.query !== '') {
      searchArticles({language: country.language.code, ...this.state});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { country, fetchSources, location, options } = this.props;
    const { search, state } = location;

    // Fetch source list & reset source when language changes
    if (country.code !== prevProps.country.code) {
      console.log('language changed');
      fetchSources(country);
      this.handleReqChange({ ...prevState.options, source: '' });
                  
    // Handle query coming from nav searchbar or from URL
    } else if (state === undefined && search !== prevProps.location.search) {
      console.log('nav searchbar request');
      this.handleReqChange(options);

    // Handle query coming from main searchbar
    } else if (state !== undefined && (search !== prevProps.location.search || !isEqual(state, prevProps.location.state))) {
      console.log('main searchbar request');
      this.handleReqChange(state);
    }
  }

  // Search articles if query !== ''
  handleReqChange = options => {
    const { country: { language }, searchArticles, resetArticles, location: { search } } = this.props;
    const decodedQuery = search ? decodeURIComponent(getQuery(search)) : '';

    this.setState({
      query: decodedQuery,
      options: {...options}
    }, () => decodedQuery !== '' ?
      searchArticles({language: language.code, ...this.state}) : resetArticles()
    );
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'query') {
      this.setState({ [name]: value });
    } else {
      this.setState(prevState => ({ options: {...prevState.options, [name]: value} }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { query, options } = this.state;
    const { lastQuery, location, history } = this.props;

    // Avoid pushing when query & options don't change (makes navigation easier)
    if (query !== '' && (query !== lastQuery || !isEqual(options, location.state))) {
      history.push(`${location.pathname}?q=${encodeURIComponent(query)}`, {...options});
    }
  }

  render() {
    const { query, options } = this.state;
    const { lastQuery, sources } = this.props;

    return (
      <div>
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
              autoFocus
            >
            </input>
            <button><i className="fas fa-search"></i></button>
          </div>

          <div className={styles.options}>
            <div>
              <label htmlFor="from">From: </label>
              <input type="date" name="from" id="from" value={options.from} onChange={this.handleInputChange}></input>
            </div>
            <div>
              <label htmlFor="to">To: </label>
              <input type="date" name="to" id="to" value={options.to} onChange={this.handleInputChange}></input>
            </div>
            <div>
              <label htmlFor="source">Source: </label>
              <select name="source" id="source" value={options.source} onChange={this.handleInputChange} size="1">
                <option value="">All</option>
                {sources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
              </select>
            </div>
          </div>

          {lastQuery !== '' && 
            <div className={styles.sort}>
              <h3>Results for: {lastQuery}</h3>
              <div>
                <label htmlFor="sortBy">Sort by: </label>
                <select name="sorting" id="sorting" value={options.sorting} size="1" onChange={this.handleInputChange}>
                  <option value="publishedAt">Published At</option>
                  <option value="relevancy">Relevancy</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>}
        </form>

        <ArticlesList />
        <Buttons />
      </div>
    );
  }
}

Search.propTypes = {
  lastQuery: PropTypes.string.isRequired,
  country: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  searchArticles: PropTypes.func.isRequired,
  fetchSources: PropTypes.func.isRequired,
  resetArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  country: state.news.country,
  sources: state.news.sources
});

export default connect(mapStateToProps, { searchArticles, fetchSources, resetArticles })(Search);