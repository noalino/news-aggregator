/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
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
    const { source, url, title, publishedAt, newest } = article;
    /** ANIMATION IF NEWEST === TRUE */
    const isBookmark = isAuthenticate ? (
      bookmarks.findIndex(item => item.id === article.id) !== -1
    ) : false;

    return (
      <article className={styles.article}>
        <a className={styles.title} href={url} target="_blank" rel="noreferrer noopener">
          <h4>{title}</h4>
          {/* {newest && <p>New</p>} */}
        </a>
        <i className={`${isBookmark ? 'fas' : 'far'} fa-bookmark`} onClick={this.updateBookmarks} />
        <div className={styles.info}>
          <p className={styles.source}>{source.name}</p>
          {' - '}
          <p className={styles.date}>{moment(publishedAt).fromNow()}</p>
        </div>
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
