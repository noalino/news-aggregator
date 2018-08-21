import React from 'react';
import style from '../styles/ArticleBox.scss';

const ArticleBox = ({ article }) => {
  return (
    <article className={style.article}>
      <header>
        <p>{article.source.name}</p>
        <div>
          <i className="fas fa-star"></i>
          <i className="fas fa-bookmark"></i>
          {/* Empty icons
          <i className="far fa-star"></i>
          <i className="far fa-bookmark"></i>*/}
        </div>
      </header>
      <img src={article.urlToImage} alt={article.title}/>
      <a href={article.url} target="_blank">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </a>
      <p>{article.publishedAt}</p>
    </article>
  )
}

export default ArticleBox;