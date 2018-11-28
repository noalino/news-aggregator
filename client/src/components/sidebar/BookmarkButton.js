/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import toggleSidebar from '../../actions/layoutActions';

import styles from '../../styles/sidebar/BookmarkButton.scss';

const BookmarkButton = ({ sidebar, toggleSidebar }) => (
  <div className={styles.buttons} sidebar={`${sidebar}`}>
    <Link to="/bookmarks" className={styles.bookmarks} onClick={() => toggleSidebar(false)}>
      <i className="fas fa-bookmark" />
      <h2>Bookmarks</h2>
    </Link>
  </div>
);

BookmarkButton.defaultProps = {
  sidebar: false,
};

BookmarkButton.propTypes = {
  sidebar: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default connect(null, { toggleSidebar })(BookmarkButton);
