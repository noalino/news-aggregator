import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/loader/Loader.scss';

const Loader = ({ pageSize }) => {
  const array = [];
  for (let i = 0; i < pageSize; i++) {
    array.push(
      <div className={styles.article} key={i}>
        <i className="fas fa-bookmark" />
        <div className={styles.title} />
        <div className={styles.info} />
      </div>,
    );
  }
  return array;
};

Loader.propTypes = {
  pageSize: PropTypes.number.isRequired,
};

export default Loader;
