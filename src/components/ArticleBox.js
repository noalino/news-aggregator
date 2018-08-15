import React from 'react';

const ArticleBox = ({ article }) => {
  return (
    <a href={article.url} target="_blank">
      <h3>{article.source.name} <span>{article.publishedAt}</span></h3>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </a>
  )
}

export default ArticleBox;