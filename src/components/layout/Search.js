import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles, fetchSources } from '../../actions/newsActions';

import Buttons from '../sidebar/Buttons';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      from: '',
      to: '',
      source: '',
      sorting: 'publishedAt'
    }
  }

  componentDidMount() {
    const { country, fetchSources } = this.props;
    fetchSources(country.language.code);
  }

  componentDidUpdate(prevProps) {
    const { country: {language}, fetchSources } = this.props;

    if (language.code != prevProps.country.language.code) {
      console.log('Search component updated');
      fetchSources(language.code);
    }
  }

  findArticles = e => {
    e.preventDefault();
    const { country: {language}, searchArticles } = this.props;

    if (this.state.query !== '') {
      searchArticles({...this.state}, language.code);
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { query, source, sorting } = this.state;
    const { lastQuery, sources, articles } = this.props;

    return (
      <div>
        <form className={styles.header} role="search" onSubmit={this.findArticles}>
          <div className={styles.searchBar}>
            <input
              type="search"
              name="query"
              placeholder="Search articles..."
              autoComplete="true"
              aria-label="Search articles"
              value={query}
              onChange={this.handleInputChange}
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

        <Buttons />
        <ArticlesList articles={articles} />
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