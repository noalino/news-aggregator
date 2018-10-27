import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/loader/Loader.scss';

const Loader = ({ pageSize }) => {
  const array = [];
  for (let i = 0; i < pageSize; i++) {
    array.push(
      <div className={styles.article} key={i}>
        <div className={styles.title} />
        <i className="far fa-bookmark" />
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
