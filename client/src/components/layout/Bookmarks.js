import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookmarks, resetArticles } from '../../actions/newsActions';

import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Bookmarks.scss';

class Bookmarks extends Component {
  componentDidMount() {
    this.props.fetchBookmarks();
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
  fetchBookmarks: PropTypes.func.isRequired
};

export default connect(null, { fetchBookmarks, resetArticles })(Bookmarks);