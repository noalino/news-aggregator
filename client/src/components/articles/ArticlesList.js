import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Spinner from '../layout/Spinner';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

class ArticlesList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.articles !== this.props.articles;
  }

  render() {
    console.log('articles list rendering');
    const { lastQuery, articles } = this.props;
    return (
      <div className={styles.scrollpage}>
      {
        (lastQuery !== '' && articles.length < 1) ? 

          <h3>No Results Found</h3> :

          <Fragment>
            <div className={styles.container}>
              {articles.map(article => ( // Remove duplicates if any (key={article.title})
                <ArticleBox key={shortid.generate()} article={article}/>
              ))}
            </div>
            {
              articles.length > 0 && 
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
  lastQuery: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired
};


const mapStateToProps = state => ({
  lastQuery: state.news.lastQuery,
  articles: state.news.articles
});

export default connect(mapStateToProps)(ArticlesList);