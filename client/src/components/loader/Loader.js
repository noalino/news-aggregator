import React from 'react';

import styles from '../../styles/loader/Loader.scss';

const Loader = () => (
  <div className={styles.article}>
    <div className={styles.source} />
    <i className="far fa-bookmark" />
    <div className={styles.image} />
    <div className={styles.text}>
      {/* <div className={styles.title}> */}
        <div />
        <div />
        <div />
        <div />
        <div />
      {/* </div> */}
      {/* <div className={styles.description}>
      </div> */}
    </div>
    <div className={styles.date} />
  </div>
);

export default Loader;
