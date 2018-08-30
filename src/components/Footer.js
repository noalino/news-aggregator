import React from 'react';
import styles from '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
    </footer>
  );
}

export default Footer;