import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuery } from '../../_utils';

// import Loader from '../loader/Loader';
import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ articles, location: { search } }) => {
  console.log('articles rendering');
  const query = getQuery(search);
  const results = articles.length;

  return (
    <Fragment>
      {
        (query && results < 1) ? (
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
  location: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
});

export default withRouter(connect(mapStateToProps)(Articles));
