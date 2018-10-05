import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmark, deleteBookmark } from '../../actions/userActions';

import styles from '../../styles/articles/Article.scss';

class Article extends Component {
  constructor(props) {
    super(props);
    const { bookmarks, article, isAuthenticated } = this.props;
    this.state = {
      // Set isBookmark to true if user is authenticated & article in bookmarks
      isBookmark: isAuthenticated ? bookmarks.findIndex(item => item.id === article.id) !== -1 : false
    };
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    // Remove bookmark from article when user logs out
    if (!isAuthenticated && this.state.isBookmark === true) {
      this.setState({ isBookmark: false });
    }
  }

  updateBookmarks = () => {
    if (this.props.isAuthenticated) {
      const { isBookmark } = this.state;
      const { addBookmark, deleteBookmark, article } = this.props;
  
      !isBookmark ? addBookmark(article) : deleteBookmark(article.id);
  
      this.setState(prevState => ({ isBookmark: !prevState.isBookmark }));
    }
  }

  render() {
    const { isBookmark } = this.state;
    const { article } = this.props;

    return (
      <article className={styles.article}>

        <p>{article.source.name}</p>
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

Article.propTypes = {
  addBookmark: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  bookmarks: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  bookmarks: state.user.bookmarks,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, { addBookmark, deleteBookmark })(Article);