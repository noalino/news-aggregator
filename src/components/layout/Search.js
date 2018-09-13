import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles, fetchSources } from '../../actions/newsActions';
import { getQuery } from '../../_utils';

import Buttons from '../sidebar/Buttons';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // query: '',
      query: this.props.history.location.search ? getQuery(this.props.history.location.search) : '',
      from: '',
      to: '',
      source: '',
      sorting: 'publishedAt' // Stored globally? (to be used by nav searchbar)
    }
  }

  componentDidMount() {
    const { country: {language}, fetchSources, searchArticles } = this.props;
    fetchSources(language.code);

    if (this.state.query !== '') {
      searchArticles({language: language.code, ...this.state});
    }
  }

  componentDidUpdate(prevProps) { /** TO UPDATE */
    const { country: {language}, fetchSources, lastQuery } = this.props;
    
    // Update source list on country change
    if (language.code != prevProps.country.language.code) {
      console.log('Search component updated');
      fetchSources(language.code);

    // Display nav query in main search bar
    } else if (lastQuery !== prevProps.lastQuery) {
      this.setState({ query: lastQuery });
    }
  }

  findArticles = () => { /* TO UPDATE */// Avoid reload if query does not change
    const { country: {language}, searchArticles } = this.props;

    if (this.state.query !== '') {
      // searchArticles({language: language.code, ...this.state});

      /* history.push(`search?q=${this.state.query}`, {...this.state}); */
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      if (name === 'sorting') {
        this.findArticles();
      }
    });
  }

  submit = e => {
    e.preventDefault();
    this.findArticles();
  }

  render() {
    const { query, source, sorting } = this.state;
    const { lastQuery, sources, articles } = this.props;

    return (
      <div>
        <form className={styles.header} role="search" onSubmit={this.submit}>
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
              <input type="date" name="from" id="from" onChange={this.handleInputChange}></input>
            </div>
            <div>
              <label htmlFor="to">To: </label>
              <input type="date" name="to" id="to" onChange={this.handleInputChange}></input>
            </div>
            <div>
              <label htmlFor="source">Source: </label>
              <select name="source" id="source" value={source} onChange={this.handleInputChange} size="1">
                <option value="">All</option>
                {sources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.sort}>
            <h3>Results for: {lastQuery}</h3>
            <div>
              <label htmlFor="sortBy">Sort by: </label>
              <select name="sorting" id="sorting" value={sorting} size="1" onChange={this.handleInputChange}>
                <option value="publishedAt">Published At</option>
                <option value="relevancy">Relevancy</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
        </form>

        <ArticlesList articles={articles} />
        <Buttons />
      </div>
    );
  }
}

Search.propTypes = {
  lastQuery: PropTypes.string,
  country: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  searchArticles: PropTypes.func.isRequired,
  fetchSources: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  country: state.news.country,
  sources: state.news.sources,
  articles: state.news.articles
});

export default connect(mapStateToProps, { searchArticles, fetchSources })(Search);