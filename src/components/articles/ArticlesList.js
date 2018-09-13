import React, { Component } from 'react';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

class ArticlesList extends Component {
// const ArticlesList = ({ articles }) => {
  // componentDidUpdate(prevProps) {

  // }
  render() {
    console.log('articles list rendering');
    const { articles } = this.props;
    return (
      <div className={styles.scrollpage}>
        <div className={styles.container}>
          {articles.map(article => ( // Remove duplicates if any
            <ArticleBox key={`${article.title} ${article.publishedAt}`} article={article}/>
          ))}
        </div>
        {articles.length > 0 && 
        <footer className={styles.footer}>
          Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
        </footer>}
      </div>
    );
  }
}

export default ArticlesList;