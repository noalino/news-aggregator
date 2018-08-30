import React from 'react';
import ArticleBox from './ArticleBox';
import styles from '../styles/ArticlesList.scss';

const ArticlesList = ({ articles }) => {
  const list = articles.map((article, index) => (
    <ArticleBox key={index} article={article}/>
  ));

  return (
    <div className={styles.container}>
      {list}
    </div>
  );
}

export default ArticlesList;