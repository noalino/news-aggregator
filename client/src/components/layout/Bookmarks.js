import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayBookmarks, resetArticles } from '../../actions/newsActions';

import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Bookmarks.scss';

class Bookmarks extends Component {
  componentDidMount() {
    this.props.displayBookmarks();
  }

  componentDidUpdate(prevProps) {
    const { bookmarks, displayBookmarks } = this.props;
    // Refresh view from bookmark removal
    if (bookmarks.length !== prevProps.bookmarks.length) {
      displayBookmarks();
    }
  }

  // componentWillUnmount() {
  //   resetArticles();
  // }

  render() {
    return (
      <div>
        <div className={styles.header}>
          <h1>My Bookmarks</h1>
        </div>
  
        <ArticlesList />
      </div>
    );
  }
}

Bookmarks.propTypes = {
  displayBookmarks: PropTypes.func.isRequired,
  // resetArticles: PropTypes.func.isRequired,
  bookmarks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  bookmarks: state.news.bookmarks
})

export default connect(mapStateToProps, { displayBookmarks, resetArticles })(Bookmarks);