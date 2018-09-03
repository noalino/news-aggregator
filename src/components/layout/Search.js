import React from 'react';
import Buttons from '../sidebar/Buttons';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Search.scss';

const Search = () => {
  return (
    <div>
      <form className={styles.header} role="search">
        <div className={styles.searchBar}>
          <input
            type="search"
            name="q"
            placeholder="Search articles..."
            autoComplete="true"
            aria-label="Search articles through site content">
          </input>
          <button><i className="fas fa-search"></i></button>
        </div>

        <div className={styles.options}>
          <div>
            <label htmlFor="from">From: </label>
            <input type="date" name="from" id="from"></input>
          </div>
          <div>
            <label htmlFor="to">To: </label>
            <input type="date" name="to" id="to"></input>
          </div>
          <div>
            <label htmlFor="country">Country: </label>
            <select name="country" id="country" size="1" multiple>
              <option disabled>Select one or more countries</option>
              <option value="fr">France</option>
              <option value="en">United States</option>
              {/* Get list from API, increase size when focus */}
            </select>
          </div>
          <div>
            <label htmlFor="source">Source: </label>
            <select name="source" id="source" size="1" multiple>
              <option disabled>Select one or more sources</option>
              <option value="le-monde">Le Monde</option>
              <option value="the-wall-street-journal">The Wall Street Journal</option>
              <option value="time">Time</option>
              {/* Get list from API, increase size when focus */}
            </select>
          </div>
        </div>

        <div className={styles.sort}>
          <h3>Results for: ai</h3>
          <div>
            <label htmlFor="sortBy">Sort by: </label>
            <select name="sortBy" id="sortBy" size="1">
              <option value="publishedAt">Published At</option>
              <option value="relevancy">Relevancy</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
      </form>

      <Buttons />

      <ArticlesList />
    </div>
  );
}

export default Search;