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
      language: 'en', // Set default based on country default
      source: '',
      sorting: 'publishedAt'
    }
  }

  componentDidMount() {
    this.props.fetchSources(this.state.language);
  }

  componentDidUpdate(prevProps, prevState) {
    const { language } = this.state;

    if (language != prevState.language) {
      console.log('Search component updated');
      this.props.fetchSources(language);
    }
  }

  findArticles = e => {
    e.preventDefault();
    const { searchArticles } = this.props;

    if (this.state.query !== '') {
      searchArticles({...this.state});
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { query, language, source, sorting } = this.state;
    const { lastQuery, languagesList, sources, articles } = this.props;

    return (
      <div>
        <form className={styles.header} role="search" onSubmit={this.findArticles}>
          <div className={styles.searchBar}>
            <input
              type="search"
              name="query"
              placeholder="Search articles..."
              autoComplete="true"
              aria-label="Search articles through site content"
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
              <label htmlFor="language">Language: </label>
              <select name="language" id="language" value={language} onChange={this.handleInputChange} size="1">
                {languagesList.map(lan => (
                  <option key={lan.code} value={lan.code}>{lan.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="source">Source: </label>
              <select name="source" id="source" value={source} onChange={this.handleInputChange} size="1">
                <option value="">All</option>
                {sources.map(src => (<option key={src.id} value={src.id}>{src.name}</option>))}
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

Search.defaultProps = {
  languagesList: [
    {
      code: 'ar',
      name: 'Arabic'
    },
    {
      code: 'de',
      name: 'German'
    },
    {
      code: 'en',
      name: 'English'
    },
    {
      code: 'es',
      name: 'Spanish'
    },
    {
      code: 'fr',
      name: 'French'
    },
    {
      code: 'he',
      name: 'Hebrew'
    },
    {
      code: 'it',
      name: 'Italian'
    },
    {
      code: 'nl',
      name: 'Dutch'
    },
    {
      code: 'no',
      name: 'Norwegian'
    },
    {
      code: 'pt',
      name: 'Portuguese'
    },
    {
      code: 'ru',
      name: 'Russian'
    },
    {
      code: 'zh',
      name: 'Chinese'
    }
  ]
}

Search.propTypes = {
  lastQuery: PropTypes.string,
  languagesList: PropTypes.array.isRequired,
  // country: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  searchArticles: PropTypes.func.isRequired,
  fetchSources: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  // country: state.news.country,
  sources: state.news.sources,
  articles: state.news.articles
});

export default connect(mapStateToProps, { searchArticles, fetchSources })(Search);