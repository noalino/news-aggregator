import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

class ArticlesList extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          // console.log(value);
          const { articles } = value;
          const isEmpty = articles.length === 0;
          
          if (isEmpty) {
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