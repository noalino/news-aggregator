import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../styles/sidebar/Buttons.scss';

const Buttons = ({ sidebar }) => (
  <div className={styles.buttons} sidebar={`${sidebar}`}>
    <Link to="/bookmarks" className={styles.bookmarks}>
      <i className="fas fa-bookmark" />
      <h2>Bookmarks</h2>
    </Link>
  </div>
);

Buttons.defaultProps = {
  sidebar: false,
};

Buttons.propTypes = {
  sidebar: PropTypes.bool,
};

export default Buttons;
