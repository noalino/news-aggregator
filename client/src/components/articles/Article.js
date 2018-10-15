/* eslint-disable no-shadow, react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmark, deleteBookmark } from '../../actions/userActions';

import styles from '../../styles/articles/Article.scss';

class Article extends Component {
  state = {
    isBookmark: false,
  }

  componentDidMount() {
    // console.log('article mounting');
    const { bookmarks, article, isAuthenticated } = this.props;
    // Set isBookmark to true if user is authenticated & article in bookmarks
    this.setState({
      isBookmark: isAuthenticated
        ? bookmarks.findIndex(item => item.id === article.id) !== -1 : false,
    });
  }

  componentDidUpdate(prevProps) {
    const { isBookmark } = this.state;
    const { isAuthenticated, bookmarks, article } = this.props;
    // Set bookmark on page refreshing
    if (isAuthenticated && bookmarks.length !== prevProps.bookmarks.length) {
      this.setState({ isBookmark: bookmarks.findIndex(item => item.id === article.id) !== -1 });
    }
    // Remove bookmark from article when user logs out
    if (!isAuthenticated && isBookmark) {
      this.setState({ isBookmark: false });
    }
  }

  updateBookmarks = () => {
    if (this.props.isAuthenticated) {
      const { isBookmark } = this.state;
      const { addBookmark, deleteBookmark, article } = this.props;

      this.setState(prevState => ({ isBookmark: !prevState.isBookmark }), () => (
        !isBookmark ? addBookmark(article) : deleteBookmark(article.id)
      ));
    }
  }

  render() {
    const { isBookmark } = this.state;
    const { article } = this.props;
    // console.log('article rendering');

    return (
      <article className={styles.article}>

        <p>{article.source.name}</p>
        <i className={`${isBookmark ? 'fas' : 'far'} fa-bookmark`} onClick={this.updateBookmarks} />

        <img src={article.urlToImage} alt={article.title} draggable="false" />

        <a href={article.url}>
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
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  bookmarks: state.user.bookmarks,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { addBookmark, deleteBookmark })(Article);
