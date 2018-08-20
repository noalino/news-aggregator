import React from 'react';
import ArticleBox from './ArticleBox';

const ArticlesList = ({ articles }) => {
  const list = articles.map(article => {
    return (
      <article key={article.title}>
        <ArticleBox article={article}/>
      </article>
    )
  })
  return (
    <div>
      {list}
    </div>
  )
}

export default ArticlesList;