import React, { Component } from 'react';
import style from '../styles/ArticleBox.scss';

class ArticleBox extends Component {
  constructor(props) {
    super(props);

    // this.handleDragStart = this.handleDragStart.bind(this);
  }

  handleDragStart(e) {
    // console.log('drag start');
    const dt = e.dataTransfer;
    // console.log(e.target.innerHTML);
    dt.setData('application/x-moz-node', e.target);
    dt.setData('text/html', e.target.innerHTML);

    const img = new Image();
    img.src = '../../public/news.svg';
    dt.setDragImage(img, 10, 10);

    dt.dropEffect = 'copy';
  }

  render() {
    const { article } = this.props;

    return (
      <article className={style.article} draggable="true" onDragStart={this.handleDragStart}>
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
        <img src={article.urlToImage} alt={article.title} draggable="false"/>
        <a href={article.url} target="_blank">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </a>
        <p>{article.publishedAt}</p>
      </article>
    );
  }
}

export default ArticleBox;