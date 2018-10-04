import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookmarks } from '../../actions/newsActions';

import Spinner from '../layout/Spinner';
import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

class Articles extends Component {

  componentDidMount() {
    // if (isAuthenticated) {
      this.props.fetchBookmarks();
    // }
  }

  shouldComponentUpdate(nextProps) {
    // /!\ it has to compare key/value pairs inside objects
    return nextProps.articles !== this.props.articles;
  }

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
  articles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  articles: state.news.articles
});

export default connect(mapStateToProps, { fetchBookmarks })(Articles);