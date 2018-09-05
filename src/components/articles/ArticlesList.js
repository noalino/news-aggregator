import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { fetchArticles } from '../../actions/newsActions';
// import Spinner from '../layout/Spinner';
import ArticleBox from './ArticleBox';
import styles from '../../styles/articles/ArticlesList.scss';

class ArticlesList extends Component {

  // componentDidMount() {
  //   console.log('articles list mounting');
  //   const { category, fetchArticles } = this.props;
  //   fetchArticles(category);
  // }

  // componentDidUpdate(prevProps) {
  //   const { category, fetchArticles } = this.props;
  //   if (category != prevProps.category) {
  //     console.log('articles list updating');
  //     fetchArticles(category);
  //   }
  // }

  render() {
    const { articles } = this.props;
    console.log('articles list rendering');
    return (
      <div className={styles.scrollpage}>
        <div className={styles.container}>
          {articles.map(article => (
            <ArticleBox key={`${article.title} ${article.publishedAt}`} article={article}/>
          ))}
        </div>
        <footer className={styles.footer}>
          Powered by <a href="https://newsapi.org/" target="_blank">News API</a>
        </footer>
      </div>
    );
  }
}

// ArticlesList.defaultProps = {
//   category: 'general'
// }

// ArticlesList.propTypes = {
//   category: PropTypes.string.isRequired,
//   articles: PropTypes.array.isRequired,
//   fetchArticles: PropTypes.func.isRequired
// }

// const mapStateToProps = state => ({
//   articles: state.news.articles
// });

// export default connect(mapStateToProps, { fetchArticles })(ArticlesList);
export default ArticlesList;