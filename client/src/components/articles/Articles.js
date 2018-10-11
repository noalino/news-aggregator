import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadNextPage } from '../../actions/articlesActions';

import Loader from '../loader/Loader';
import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ loadNextPage, ...searchArgs }) => {
  console.log('articles rendering');
  const { articles, lastQuery, totalResults, page, pageSize } = searchArgs;
  const results = articles.length;

  return (
    <div className={styles.scrollpage}>
    {
      (lastQuery !== '' && results < 1) ? 

        <h3>No Results Found</h3> :

        <Fragment>
          <div className={styles.container}>
            {articles.map(article => <Article key={article.id} article={{...article}} />)}
          </div>
          
          <footer className={styles.footer}>
            {totalResults > (page * pageSize) && 
              <button onClick={() => loadNextPage(searchArgs)}>See more</button>
            }
            {results > 0 && <p>Powered by <a href="https://newsapi.org/" target="_blank">News API</a></p>}
          </footer>
        </Fragment>
    }
    </div>
  );
}

Articles.propTypes = {
  articles: PropTypes.array.isRequired,
  lastQuery: PropTypes.string.isRequired,

  page: PropTypes.number,
  pageSize: PropTypes.number,
  totalResults: PropTypes.number,
  language: PropTypes.string,
  options: PropTypes.object
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  lastQuery: state.articles.lastQuery,

  page: state.articles.page,
  pageSize: state.articles.pageSize,
  totalResults: state.articles.totalResults,
  language: state.articles.country.language.code,
  options: state.articles.options
});

export default connect(mapStateToProps, { loadNextPage })(Articles);