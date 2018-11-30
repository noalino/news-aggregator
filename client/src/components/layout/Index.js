/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchArticles, getHeadlines, resetArticles } from '../../actions/articlesActions';
import { isValidTopic, apiCallFrequency } from '../../_utils';

import NotFound from '../../NotFound';
import Topics from '../sidebar/Topics';
import BookmarkButton from '../sidebar/BookmarkButton';
import Articles from '../articles/Articles';
import Footer from './Footer';

import styleGrid from '../../styles/helpers/_layout.scss';
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

    if (isValidTopic(topic)) {
      fetchArticles(getHeadlines, { articles, country: code, topic });
      this.timer = setInterval(this.fetchTimer, apiCallFrequency);
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { topic: prevTopic } }, country: { code: prevCode } } = prevProps;
    const { match, country, articles, fetchArticles, getHeadlines } = this.props;
    const { params: { topic } } = match;
    const { code } = country;

    if (isValidTopic(topic) && (topic !== prevTopic || code !== prevCode)) {
      fetchArticles(getHeadlines, { articles, country: code, topic });
      this.timer = setInterval(this.fetchTimer, apiCallFrequency);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resetArticles();
    clearInterval(this.timer);
  }

  fetchTimer = () => {
    const { getHeadlines, articles, country: { code }, match: { params: { topic } } } = this.props;
    getHeadlines({ articles, country: code, topic });
  }

  render() {
    const { match: { params: { topic } } } = this.props;

    if (!isValidTopic(topic)) {
      return <NotFound />;
    }
    return (
      <Fragment>
        <Topics />
        <BookmarkButton />
        <div className={styleGrid.showcase}>
          <header className={`${styleGrid.header} ${styles.header}`}>
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
