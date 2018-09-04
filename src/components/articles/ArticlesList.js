import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

class ArticlesList extends Component {

  render() {
    return (
      <Consumer>
        {({ articles }) => {
          console.log('articles list rendering');
          const isFetch = articles.length > 0; // Add loading state in context (length always > 0 but mounting)
          
          if (!isFetch) {
            return <Spinner />;
      
          } else {
            return (
              <div className={styles.scrollpage}>
                <div className={styles.container}>
                  {articles.map(article => (
                    <ArticleBox key={`${article.title} ${article.publishedAt}`} article={article}/>
                  ))}
                </div>
                <footer className={styles.footer}>
                  Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
                </footer>
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default ArticlesList;