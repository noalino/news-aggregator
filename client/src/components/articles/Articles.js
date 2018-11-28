import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParams } from '../../_utils';

import Loader from '../loader/Loader';
import Article from './Article';

import styleGrid from '../../styles/helpers/_layout.scss';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ articles, isLoading, totalResults, pageSize, location }) => {
  const { query } = getParams(location.search);

  if (query && totalResults === 0 && !isLoading) return null;

  return (
    <div className={`${styleGrid.container} ${styles.container}`}>
      {isLoading ? (
        <Loader pageSize={pageSize} />
      ) : (
        articles.map(article => (
          article.title && (
            <Article
              key={article.id}
              article={{ ...article }}
            />
          )
        ))
      )}
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalResults: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isLoading: state.articles.isLoading,
  totalResults: state.articles.totalResults,
  pageSize: state.articles.pageSize,
});

export default withRouter(connect(mapStateToProps)(Articles));
