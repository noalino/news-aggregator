/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchArticles, getHeadlines, resetArticles } from '../../actions/articlesActions';

import Topics from '../sidebar/Topics';
import Buttons from '../sidebar/Buttons';
import Articles from '../articles/Articles';
import Footer from './Footer';
import styles from '../../styles/layout/Index.scss';

class Index extends Component {
  constructor() {
    super();
    this.timer = null;
  }

  componentDidMount() {
    const { match, country, articles, fetchArticles, getHeadlines } = this.props;
    const { params: { topic } } = match;
    const { code } = country;
    console.log('Index mounting');

    fetchArticles(getHeadlines, { articles, country: code, topic });

    // FETCH ARTICLES EVERY MINUTE (LIMIT 1,000 REQUESTS/DAY API)
    // this.timer = setInterval(this.fetchTimer, 60000);
    // this.timer = setInterval(this.fetchTimer, 5000);
  }

  componentDidUpdate(prevProps) {
    const { match, country, articles, fetchArticles, getHeadlines } = this.props;
    const { params: { topic } } = match;
    const { code } = country;

    if (topic !== prevProps.match.params.topic || code !== prevProps.country.code) {
      console.log('Index updating');
      fetchArticles(getHeadlines, { articles, country: code, topic });
      // this.timer = setInterval(this.fetchTimer, 60000);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resetArticles();
    // clearInterval(this.timer);
  }

  fetchTimer = () => {
    const { getHeadlines, articles, country: { code }, match: { params: { topic } } } = this.props;
    getHeadlines({ articles, country: code, topic });
  }

  render() {
    return (
      <Fragment>
        <Topics />
        <Buttons />
        <div className={styles.showcase}>
          <header className={styles.header}>
            <h1 className={styles.title}>Top Stories</h1>
            <p className={styles.date}>{moment(Date.now()).format('MMMM D, YYYY')}</p>
          </header>
          <Articles />
          <Footer />
        </div>
      </Fragment>
    );
  }
}

Index.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  country: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  fetchArticles: PropTypes.func.isRequired,
  getHeadlines: PropTypes.func.isRequired,
  resetArticles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  country: state.articles.country,
  articles: state.articles.articles,
});

export default connect(mapStateToProps, { fetchArticles, getHeadlines, resetArticles })(Index);
