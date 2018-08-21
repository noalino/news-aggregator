import React from 'react';
import ArticleBox from './ArticleBox';
import style from '../styles/ArticlesList.scss';

const ArticlesList = ({ articles }) => {
  const list = articles.map(article => {
    return <ArticleBox key={article.title} article={article}/>;
  });

  return (
    <div className={style.container}>
      {list}
    </div>
  );
}

export default ArticlesList;