import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../styles/articles/ArticleBox.scss';

class ArticleBox extends Component {
  state = {
    isSaved: false
  };
  // handleDragStart(e) {
  //   const dt = e.dataTransfer;
  //   dt.setData('text/plain', e.target.id);

  //   const img = new Image();
  //   img.src = '../../public/news.svg';
  //   dt.setDragImage(img, 10, 10);

  //   e.dropEffect = 'copy';
  // }
  handleBookmark = () => {
    const { isSaved } = this.state;
    const { article } = this.props;
    const user = { username: "delphine", password: "whatever" };
    // console.log(article);
    if (!isSaved) {
      axios.post('http://localhost:5000/api/bookmarks', { ...user, article  });
    } else {
      axios.put(`http://localhost:5000/api/bookmarks/${article.id}`, { ...user });
    }

    this.setState(prevState => ({ isSaved: !prevState.isSaved }));
  }

  render() {
    const { isSaved } = this.state;
    const { article } = this.props;

    return (
      <article className={styles.article}>
      {/*<article id={article.title} className={style.article} draggable="true" onDragStart={this.handleDragStart}>*/}

        <p>{article.source.name}</p>
        <i className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"} onClick={this.handleBookmark}></i>

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