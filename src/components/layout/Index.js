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
    const { pathname, country, fetchArticles } = this.props;
    const category = pathname.split('/')[1] ? pathname.split('/')[1] : 'general';
    console.log('Index mounting');

    fetchArticles(country.code, category);
  }

  componentDidUpdate(prevProps) {
    const { pathname, country, fetchArticles } = this.props;
    const category = pathname.split('/')[1] ? pathname.split('/')[1] : 'general';

    if (pathname !== prevProps.pathname || country.code != prevProps.country.code) {
      console.log('Index updating');
      fetchArticles(country.code, category);
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
  country: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  country: state.news.country,
  articles: state.news.articles
});

export default connect(mapStateToProps, { fetchArticles })(Index);