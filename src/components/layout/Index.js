import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArticles } from '../../actions/newsActions';

import Spinner from '../layout/Spinner';
import Sidebar from '../sidebar/Sidebar';
import ArticlesList from '../articles/ArticlesList';
import styles from '../../styles/layout/Index.scss';

class Index extends Component {

  componentDidMount() {
    const { match: { params: {topic}}, country, fetchArticles } = this.props;
    const category = topic ? topic : 'general'; // Implementing Redirect in App instead?
    console.log('Index mounting');    

    fetchArticles(country, category);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: {topic}}, country, fetchArticles } = this.props;
    const category = topic ? topic : 'general';
    const prevCategory = prevProps.match.params.topic ? prevProps.match.params.topic : 'general';

    if (category != prevCategory || country != prevProps.country) {
      console.log('Index updating');
      fetchArticles(country, category);
    }
  }

  render() {
    const { articles } = this.props;
    return (
      <React.Fragment>
        <header className={styles.header}>
          <h1 className={styles.title}>Top Stories</h1>
          <p className={styles.date}>Monday, August 20, 2018</p>
        </header>
        <Sidebar />
        <ArticlesList articles={articles}/>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  country: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  country: state.news.country,
  articles: state.news.articles
});

export default connect(mapStateToProps, { fetchArticles })(Index);