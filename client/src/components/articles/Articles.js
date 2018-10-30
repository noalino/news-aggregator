import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParams } from '../../_utils';

import Loader from '../loader/Loader';
import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ articles, isLoading, totalResults, pageSize, location, error, errMessage }) => {
  console.log('articles rendering');
  const { query } = getParams(location.search);

  if (error) return <p>{errMessage}</p>;
  if (query && totalResults === 0 && !isLoading) return null;

  return (
    <div className={styles.container}>
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
  error: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isLoading: state.articles.isLoading,
  totalResults: state.articles.totalResults,
  pageSize: state.articles.pageSize,
  error: state.articles.error,
  errMessage: state.articles.errMessage,
});

export default withRouter(connect(mapStateToProps)(Articles));
