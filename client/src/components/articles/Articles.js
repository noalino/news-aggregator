import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuery } from '../../_utils';

import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ articles, totalResults, location: { search }, error, errMessage }) => {
  console.log('articles rendering');
  const query = getQuery(search);
  const results = articles.length;

  if (error) {
    return <p>{errMessage}</p>;
  }
  if (query && totalResults === 0) return null;
  if (results === 0) {
    console.log('loading');
    return <p>Loading</p>;
  }

  return (
    <div className={styles.container}>
      {articles.map(article => (
        <Article
          key={article.id}
          article={{ ...article }}
        />
      ))}
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  totalResults: PropTypes.bool.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  totalResults: state.articles.totalResults,
  error: state.articles.error,
  errMessage: state.articles.errMessage,
});

export default withRouter(connect(mapStateToProps)(Articles));
