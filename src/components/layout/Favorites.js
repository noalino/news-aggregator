import React from 'react';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Favorites.scss';

const Favorites = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1>My Favorites</h1>
      </div>

      <ArticlesList />
    </div>
  );
}

export default Favorites;