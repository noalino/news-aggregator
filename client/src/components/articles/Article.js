import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBookmark, deleteBookmark } from '../../actions/newsActions';

import styles from '../../styles/articles/Article.scss';

class Article extends Component {
  constructor(props) {
    super(props);
    const { bookmarks, article } = this.props;
    this.state = {
      // 'isBookmark: true' if article is in bookmarks
      isBookmark: bookmarks.findIndex(item => item.id === article.id) !== -1
    };
  }

  // componentDidMount() {
  //   const { bookmarks, article } = this.props;
  //   let isBookmark = false;
  //   if (isAuthenticated) {
  //     isBookmark = bookmarks.findIndex(item => item.id === article.id) !== -1
  //   }
  //   this.setState({
  //     isBookmark
  //   });
  // }

  updateBookmarks = () => {
    const { isBookmark } = this.state;
    const { addBookmark, deleteBookmark, article } = this.props;

    !isBookmark ? addBookmark(article) : deleteBookmark(article.id);

    this.setState(prevState => ({ isBookmark: !prevState.isBookmark }));
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
  bookmarks: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  bookmarks: state.news.bookmarks
});

export default connect(mapStateToProps, { addBookmark, deleteBookmark })(Article);