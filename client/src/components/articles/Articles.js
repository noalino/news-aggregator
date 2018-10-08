import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookmarks } from '../../actions/userActions';

import Loader from '../loader/Loader';
import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

class Articles extends Component {

  componentDidMount() { // TO IMPROVE
    const { isAuthenticated, fetchBookmarks } = this.props;
    if (isAuthenticated) {
      fetchBookmarks();
    }
  }

  shouldComponentUpdate(nextProps) {
    // /!\ it has to compare key/value pairs inside objects
    // return nextProps.articles !== this.props.articles;
    return nextProps.articles !== this.props.articles || nextProps.isAuthenticated !== this.props.isAuthenticated;
  }

  /** REFRESHING PAGE REMOVES BOOKMARKS (ARTICLES DON'T MOUNT WHEN REFRESH) */
  // componentDidUpdate(prevProps) {
  //   const { isAuthenticated, fetchBookmarks } = this.props;
  //   if (isAuthenticated && isAuthenticated !== prevProps.isAuthenticated) {
  //     fetchBookmarks();
  //   }
  // }

  render() {
    console.log('articles list rendering');
    const { lastQuery, articles } = this.props;
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
            
            {results > 0 && 
              <footer className={styles.footer}>
                Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
              </footer>
            }
          </Fragment>
      }
      </div>
    );
  }
}

Articles.propTypes = {
  fetchBookmarks: PropTypes.func.isRequired,
  lastQuery: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  lastQuery: state.articles.lastQuery,
  articles: state.articles.articles,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { fetchBookmarks })(Articles);