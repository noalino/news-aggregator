import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import Loader from '../loader/Loader';
import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ articles, lastQuery }) => {
  console.log('articles rendering');
  const results = articles.length;

  return (
    <Fragment>
      {
        (lastQuery !== '' && results < 1) ? (
          <h3>No Results Found</h3>
        ) : (
          <div className={styles.container}>
            {articles.map(article => <Article key={article.id} article={{ ...article }} />)}
          </div>
        )
      }
    </Fragment>
  );
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  lastQuery: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  lastQuery: state.articles.lastQuery,
});

export default connect(mapStateToProps)(Articles);
