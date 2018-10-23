/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmark, deleteBookmark } from '../../actions/userActions';

import Loader from '../loader/Loader';
import styles from '../../styles/articles/Article.scss';

class Article extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { article } = this.props;
    const isImage = article.urlToImage !== null;
    return !isImage && this.loadArticle();
  }

  loadArticle = () => {
    this.setState({ loading: false });
  }

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
    const { loading } = this.state;
    // const loading = true;
    const { isAuthenticate, bookmarks, article } = this.props;
    const isImage = article.urlToImage !== null;
    const isBookmark = isAuthenticate ? (
      bookmarks.findIndex(item => item.id === article.id) !== -1
    ) : false;

    return (
      <Fragment>
        {/* LOAD IMAGE FOR LOADING STATE PURPOSES */}
        {/* ON ERROR / WAIT FOR ALL ARTICLES TO SHOW THEM ALL */}
        {isImage && (
          <img
            src={article.urlToImage}
            style={{display: 'none'}}
            onLoad={this.loadArticle}
          />
        )}
        {loading ? (
          <Loader />
        ) : (
          <article className={styles.article}>
            <p>{article.source.name}</p>
            <i className={`${isBookmark ? 'fas' : 'far'} fa-bookmark`} onClick={this.updateBookmarks} />

            {isImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                draggable="false"
              />
            )}

            <a href={article.url} target="_blank" rel="noreferrer noopener">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </a>

            <p>{article.publishedAt}</p>
          </article>
        )}
      </Fragment>
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
  articles: state.articles.articles,
  bookmarks: state.user.bookmarks,
  isAuthenticate: state.user.isAuthenticate,
});

export default connect(mapStateToProps, { addBookmark, deleteBookmark })(Article);
