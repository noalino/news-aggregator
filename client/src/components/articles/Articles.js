import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuery } from '../../_utils';

import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ articles, location: { search }, error, errMessage }) => {
  console.log('articles rendering');
  const query = getQuery(search);
  const results = articles.length;

  if (error) {
    return <p>{errMessage}</p>;
  }
  if (query && results < 1) {
    return <p>No Results Found</p>;
  }

  return (
    <div className={styles.container}>
      {articles.map((article, i) => (
        <Article
          key={article.id}
          index={i}
          article={{ ...article }}
        />
      ))}
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  error: state.articles.error,
  errMessage: state.articles.errMessage,
});

export default withRouter(connect(mapStateToProps)(Articles));
