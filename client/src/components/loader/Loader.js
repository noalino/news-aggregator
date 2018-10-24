import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/loader/Loader.scss';

const Loader = ({ isImage }) => (
  <div className={styles.article}>
    <div className={styles.source} />
    <i className="far fa-bookmark" />
    {isImage && <div className={styles.image} />}
    <div className={styles.text}>
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <div className={styles.date} />
  </div>
);

Loader.propTypes = {
  isImage: PropTypes.bool.isRequired,
};

export default Loader;
