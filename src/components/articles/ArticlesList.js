import React from 'react';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

const ArticlesList = ({ articles }) => {

  console.log('articles list rendering');
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

export default ArticlesList;