import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Index.scss';

const Index = ({ match }) => {
  // const category = match.params.category ? match.params.category : 'general';

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1 className={styles.title}>Top Stories</h1>
        <p className={styles.date}>Monday, August 20, 2018</p>
      </header>
      <Sidebar />
      <ArticlesList category={match.params.category} />
    </React.Fragment>
  );
}

export default Index;
