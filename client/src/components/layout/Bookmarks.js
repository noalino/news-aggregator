/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayBookmarks, resetArticles } from '../../actions/articlesActions';

import Articles from '../articles/Articles';
import Footer from './Footer';

import styleGrid from '../../styles/helpers/_layout.scss';
import styles from '../../styles/layout/Bookmarks.scss';

class Bookmarks extends Component {
  componentDidMount() {
    const { displayBookmarks, bookmarks } = this.props;
    displayBookmarks(bookmarks);
  }

  componentDidUpdate(prevProps) {
    const { bookmarks, displayBookmarks } = this.props;
    // Refresh view when user removes bookmark to an article
    if (bookmarks.length !== prevProps.bookmarks.length) {
      displayBookmarks(bookmarks);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resetArticles();
  }

  render() {
    return (
      <div className={styleGrid.showcase}>
        <div className={`${styleGrid.header} ${styles.header}`}>
          <h1>My Bookmarks</h1>
        </div>
        <Articles />
        <Footer />
      </div>
    );
  }
}

Bookmarks.propTypes = {
  displayBookmarks: PropTypes.func.isRequired,
  resetArticles: PropTypes.func.isRequired,
  bookmarks: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  bookmarks: state.user.bookmarks,
});

export default connect(mapStateToProps, { displayBookmarks, resetArticles })(Bookmarks);
