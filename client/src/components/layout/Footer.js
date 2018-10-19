/* eslint-disable no-shadow */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadNextPage } from '../../actions/articlesActions';
import { getQuery } from '../../_utils';

import styles from '../../styles/layout/Footer.scss';

const Footer = ({ totalResults, loadNextPage, location, ...searchArgs }) => {
  const { articles, page, pageSize } = searchArgs;
  const query = getQuery(location.search);
  const results = articles.length;

  return (
    <footer className={styles.footer}>
      {totalResults > (page * pageSize) && (
        <button type="button" onClick={() => loadNextPage({ query, ...searchArgs })}>
          {/* See more */}
          <i className="fa fa-caret-down" />
        </button>
      )}

      {results > 0 && (
        <p>
          Powered by
          {' '}
          <a href="https://newsapi.org/" target="_blank" rel="noreferrer noopener">
            News API
          </a>
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
  page: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  loadNextPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  page: state.articles.page,
  pageSize: state.articles.pageSize,
  totalResults: state.articles.totalResults,
  language: state.articles.country.language.code,
  options: state.articles.options,
});

export default withRouter(connect(mapStateToProps, { loadNextPage })(Footer));
