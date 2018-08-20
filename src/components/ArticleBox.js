import React from 'react';
import style from '../styles/ArticleBox.scss';

const ArticleBox = ({ article }) => {
  return (
    <a className={style.ArticleBox} href={article.url} target="_blank">
      <h3>{article.source.name} <span>{article.publishedAt}</span></h3>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </a>
  )
}

export default ArticleBox;