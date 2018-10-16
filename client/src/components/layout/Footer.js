/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadNextPage } from '../../actions/articlesActions';

import styles from '../../styles/layout/Footer.scss';

const Footer = ({ totalResults, loadNextPage, ...searchArgs }) => {
  const { articles, page, pageSize } = searchArgs;
  const results = articles.length;

  return (
    <footer className={styles.footer}>
      {totalResults > (page * pageSize) && (
        <button type="button" onClick={() => loadNextPage(searchArgs)}>
          See more
        </button>
      )}

      {results > 0 && (
        <p>
          Powered by
          {' '}
          <a href="https://newsapi.org/">News API</a>
        </p>
      )}
    </footer>
  );
};

Footer.defaultProps = {
  page: 1,
};

Footer.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  lastQuery: PropTypes.string.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  loadNextPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  lastQuery: state.articles.lastQuery,
  page: state.articles.page,
  pageSize: state.articles.pageSize,
  totalResults: state.articles.totalResults,
  language: state.articles.country.language.code,
  options: state.articles.options,
});

export default connect(mapStateToProps, { loadNextPage })(Footer);
