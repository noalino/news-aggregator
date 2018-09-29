import React, { Component } from 'react';
import axios from 'axios';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Bookmarks.scss';

class Bookmarks extends Component {
  async componentDidMount() {
    const secret_token = 'to_fetch_from_cookie';
    const user = await axios.get('http://localhost:5000/api/user/bookmarks', {
      headers: { 'Bearer': secret_token }
    });
    const articles = user.data;
    /** CHANGE ARTICLES FROM user.bookmarks */
  }

  render() {
    return (
      <div>
        <div className={styles.header}>
          <h1>My Bookmarks</h1>
        </div>
  
        <ArticlesList />
      </div>
    );
  }
}

export default Bookmarks;