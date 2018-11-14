/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import moment from 'moment';
import { addBookmark, deleteBookmark } from '../../actions/userActions';

import styleGrid from '../../styles/helpers/_article.scss';
import styles from '../../styles/articles/Article.scss';

class Article extends Component {
  state = {
    animation: false,
  };

  componentDidMount() {
    if (this.props.article.newest) {
      this.setState({ animation: true });
    }
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
    const { animation } = this.state;
    const { isAuthenticate, bookmarks, article } = this.props;
    const { source, url, title, publishedAt } = article;
    const isBookmark = isAuthenticate ? (
      bookmarks.findIndex(item => item.id === article.id) !== -1
    ) : false;

    return (
      <Transition in={animation} timeout={150}>
        {state => (
          <article className={`${styleGrid.article} ${styles.article}`} state={state}>
            <a className={`${styleGrid.title} ${styles.title}`} href={url} target="_blank" rel="noreferrer noopener">
              <h4>{title}</h4>
            </a>
            <button type="button" onClick={this.updateBookmarks}>
              <i className={`${isBookmark ? 'fas' : 'far'} fa-bookmark`} />
            </button>
            <div className={`${styleGrid.info} ${styles.info}`}>
              <p className={styles.source}>{source.name}</p>
              {' - '}
              <p className={styles.date}>{moment(publishedAt).fromNow()}</p>
            </div>
          </article>
        )}
      </Transition>
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
