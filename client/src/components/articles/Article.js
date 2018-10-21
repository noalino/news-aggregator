/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmark, deleteBookmark } from '../../actions/userActions';

import styles from '../../styles/articles/Article.scss';

class Article extends Component {
  updateBookmarks = () => {
    const { isAuthenticate } = this.props;
    if (isAuthenticate) {
      const { addBookmark, deleteBookmark, article, bookmarks } = this.props;
      const isBookmark = isAuthenticate ? (
        bookmarks.findIndex(item => item.id === article.id) !== -1
      ) : false;

      return !isBookmark ? addBookmark(article) : deleteBookmark(article.id);
    }
    return null;
  }

  render() {
    const { isAuthenticate, bookmarks, article } = this.props;
    const isBookmark = isAuthenticate ? (
      bookmarks.findIndex(item => item.id === article.id) !== -1
    ) : false;

    return (
      <article className={styles.article}>

        <p>{article.source.name}</p>
        <i className={`${isBookmark ? 'fas' : 'far'} fa-bookmark`} onClick={this.updateBookmarks} />

        <img src={article.urlToImage} alt={article.title} draggable="false" />

        <a href={article.url} target="_blank" rel="noreferrer noopener">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </a>

        <p>{article.publishedAt}</p>
      </article>
    );
  }
}

Article.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  addBookmark: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  bookmarks: PropTypes.instanceOf(Array).isRequired,
  isAuthenticate: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  bookmarks: state.user.bookmarks,
  isAuthenticate: state.user.isAuthenticate,
});

export default connect(mapStateToProps, { addBookmark, deleteBookmark })(Article);
