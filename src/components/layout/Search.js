import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles, fetchSources } from '../../actions/newsActions';
import { getQuery, isEqual } from '../../_utils';

import Buttons from '../sidebar/Buttons';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    const { search } = this.props.location;
    this.state = {
      // Initialize query to the one from nav searchbar or URL if it exists
      query: search ? decodeURIComponent(getQuery(search)) : '',
      options: { ...this.props.options }
    }
  }

  componentDidMount() {
    const { country: {language}, fetchSources, searchArticles } = this.props;
    console.log('Search component mounting');

    fetchSources(language.code);

    if (this.state.query !== '') {
      searchArticles({language: language.code, ...this.state});
    }
  }

  componentDidUpdate(prevProps) {
    const { country: {language}, fetchSources, searchArticles, location } = this.props;
    const { search, state } = location;
    const decodedQuery = search ? decodeURIComponent(getQuery(search)) : '';
    // console.log('location updating', this.props.location);

    // Fetch source list & reset source on country change
    if (language.code !== prevProps.country.language.code) {
      fetchSources(language.code);
      this.setState({ options: {source: ''} });
                  
    // Handle query coming from nav searchbar or from URL
    } else if (state === undefined && search !== prevProps.location.search) {
      console.log('nav searchbar request');
      this.setState(
        {
          query: decodedQuery,
          options: {...this.props.options}
        },
        () => searchArticles({language: language.code, ...this.state})
      );

    // Handle query coming from main searchbar
    } else if (state !== undefined && (search !== prevProps.location.search || !isEqual(state, prevProps.location.state))) {
      console.log('main searchbar request');
      this.setState(
        {
          query: decodedQuery,
          options: {...state}
        },
        () => searchArticles({language: language.code, ...this.state})
      );
    }
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
    const { lastQuery, sources, articles } = this.props;

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

        <ArticlesList articles={articles} />
        <Buttons />
      </div>
    );
  }
}

Search.defaultProps = {
  options: {
    from: '',
    to: '',
    source: '',
    sorting: 'publishedAt'
  }
};

Search.propTypes = {
  lastQuery: PropTypes.string.isRequired,
  country: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  searchArticles: PropTypes.func.isRequired,
  fetchSources: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  country: state.news.country,
  sources: state.news.sources,
  articles: state.news.articles
});

export default connect(mapStateToProps, { searchArticles, fetchSources })(Search);