import React from 'react';
import ArticleBox from './ArticleBox';

const ArticlesList = ({ articles }) => {
  const list = articles.map(article => {
    return (
      <li key={article.title}>
        <ArticleBox article={article}/>
      </li>
    )
  })
  return (
    <ul>
      {list}
    </ul>
  )
}

export default ArticlesList;