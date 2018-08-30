import React from 'react';
import styles from '../styles/Home.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import ArticlesList from './ArticlesList';
import Footer from './Footer';

const Home = ({ articles, ...props }) => {
  return (
    <div className={styles.home}>
      <Header />
      <Sidebar {...props} />
      <div className={styles.scrollpage}>
        <ArticlesList articles={articles}/>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
