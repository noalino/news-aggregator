import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookmarks } from '../../actions/newsActions';

import Spinner from '../layout/Spinner';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

class ArticlesList extends Component {

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
              {articles.map(article => <ArticleBox key={article.id} article={{...article}} />)}
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

ArticlesList.propTypes = {
  fetchBookmarks: PropTypes.func.isRequired,
  lastQuery: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  articles: state.news.articles
});

export default connect(mapStateToProps, { fetchBookmarks })(ArticlesList);