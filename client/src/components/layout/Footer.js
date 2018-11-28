/* eslint-disable no-shadow */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchNextArticles } from '../../actions/articlesActions';
import { getParams } from '../../_utils';

import styleGrid from '../../styles/helpers/_layout.scss';
import styles from '../../styles/layout/Footer.scss';

const Footer = ({ totalResults, searchNextArticles, location: { search }, ...args }) => {
  const { articles, page, pageSize, language } = args;
  const { query, ...options } = getParams(search);
  const searchArgs = { query, options, articles, page, pageSize, language };
  const results = articles.length;

  return (
    <footer className={`${styleGrid.footer} ${styles.footer}`}>
      {totalResults > (page * pageSize) && (
        <button type="button" onClick={() => searchNextArticles(searchArgs)}>
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
  location: PropTypes.instanceOf(Object).isRequired,
  searchNextArticles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  page: state.articles.page,
  pageSize: state.articles.pageSize,
  totalResults: state.articles.totalResults,
  language: state.articles.country.language.code,
});

export default withRouter(connect(mapStateToProps, { searchNextArticles })(Footer));
