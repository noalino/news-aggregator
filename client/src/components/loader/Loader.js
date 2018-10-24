import React from 'react';

import styles from '../../styles/loader/Loader.scss';

const Loader = () => (
  <div className={styles.article}>
    <div className={styles.title} />
    <i className="far fa-bookmark" />
    <div className={styles.info} />
  </div>
);

export default Loader;
