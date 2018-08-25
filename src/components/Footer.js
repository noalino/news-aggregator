import React from 'react';
import style from '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className={style.footer}>
      Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
    </footer>
  );
}

export default Footer;