import React from 'react';
import styles from '../styles/Header.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Top Stories</h1>
      <p className={styles.date}>Monday, August 20, 2018</p>
    </header>
  );
}

export default Header;