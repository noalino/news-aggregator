import React from 'react';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Bookmarks.scss';

const Bookmarks = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1>My Bookmarks</h1>
      </div>

      <ArticlesList />
    </div>
  );
}

export default Bookmarks;