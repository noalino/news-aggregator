import React from 'react';

import styles from './styles/NotFound.scss';

const NotFound = () => (
  <div className={styles.container}>
    <h1>
      <span>Sorry, </span>
      this page does not exist.
    </h1>
  </div>
);

export default NotFound;
