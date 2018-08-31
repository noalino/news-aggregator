import React from 'react';
import ArticlesList from './ArticlesList';
import Footer from './Footer';
import styles from '../styles/Favorites.scss';
import jsonResponse from '../data';

const Favorites = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1>My Favorites</h1>
      </div>

      <div className={styles.scrollpage}>
        <ArticlesList articles={jsonResponse.all.articles}/>
        <Footer />
      </div>
    </div>
  );
}

export default Favorites;