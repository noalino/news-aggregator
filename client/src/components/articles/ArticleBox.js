import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmark, deleteBookmark } from '../../actions/newsActions';

import styles from '../../styles/articles/ArticleBox.scss';

class ArticleBox extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isBookmark: false
  //   };
  // }
  state = {
    isBookmark: false
  };
  
  // handleDragStart(e) {
  //   const dt = e.dataTransfer;
  //   dt.setData('text/plain', e.target.id);

  //   const img = new Image();
  //   img.src = '../../public/news.svg';
  //   dt.setDragImage(img, 10, 10);

  //   e.dropEffect = 'copy';
  // }
  updateBookmarks = () => {
    const { isBookmark } = this.state;
    const { addBookmark, deleteBookmark, article } = this.props;

    // if (!isBookmark) {
    //   addBookmark(article)
    // } else {
    //   deleteBookmark(article.id)
    // }

    !isBookmark ? addBookmark(article) : deleteBookmark(article.id);

    this.setState(prevState => ({ isBookmark: !prevState.isBookmark }));
  }

  render() {
    const { isBookmark } = this.state;
    const { article } = this.props;

    return (
      <article className={styles.article}>
      {/*<article id={article.title} className={style.article} draggable="true" onDragStart={this.handleDragStart}>*/}

        <p>{article.source.name}</p>
        {/* <i className={isBookmark ? "fas fa-bookmark" : "far fa-bookmark"} onClick={this.handleBookmark}></i> */}
        <i className={`${isBookmark ? "fas" : "far"} fa-bookmark`} onClick={this.updateBookmarks}></i>

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

ArticleBox.propTypes = {
  addBookmark: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired
}

export default connect(null, { addBookmark, deleteBookmark })(ArticleBox);