import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';
import jsonResponse from '../../data';

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // category: 'general',
      articles: []
    }
  }

  componentDidMount() {
    // axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.match.params.category}&apiKey=${process.env.API_KEY}`)
    //   .then(res => this.setState({ articles: res.data.articles }))
    //   .catch(err => console.warn(err))

    this.setState({ articles: jsonResponse.business.articles })
  }

  render() {
    const { articles } = this.state;
    const isEmpty = articles.length === 0;
    
    if (isEmpty) {
      return <Spinner />;

    } else {
      const list = articles.map(article => (
        <ArticleBox key={`${article.title} ${article.publishedAt}`} article={article}/>
      ));

      return (
        <div className={styles.scrollpage}>
          <div className={styles.container}>
            {list}
          </div>
          <footer className={styles.footer}>
            Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
          </footer>
        </div>
      );
    }
  }
}

export default ArticlesList;