import React from 'react';
import ArticlesList from './ArticlesList';
import Footer from './Footer';
import styles from '../styles/Bookmarks.scss';
import jsonResponse from '../data';

const Bookmarks = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1>My Bookmarks</h1>
      </div>

      <div className={styles.scrollpage}>
        <ArticlesList articles={jsonResponse.all.articles}/>
        <Footer />
      </div>
    </div>
  );
}

export default Bookmarks;