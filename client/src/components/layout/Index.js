/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArticles, resetArticles } from '../../actions/articlesActions';

import Sidebar from '../sidebar/Sidebar';
import Articles from '../articles/Articles';
import Footer from './Footer';
import styles from '../../styles/layout/Index.scss';

class Index extends Component {
  componentDidMount() {
    const { match: { params: { topic } }, country, fetchArticles } = this.props;
    console.log('Index mounting');

    fetchArticles(country.code, topic);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { topic } }, country, fetchArticles } = this.props;
    if (topic !== prevProps.match.params.topic || country.code !== prevProps.country.code) {
      console.log('Index updating');

      fetchArticles(country.code, topic);
    }
  }

  componentWillUnmount() {
    this.props.resetArticles(); // eslint-disable-line react/destructuring-assignment
  }

  render() {
    return (
      <div className={styles.showcase}>
        <header className={styles.header}>
          <h1 className={styles.title}>Top Stories</h1>
          <p className={styles.date}>Monday, August 20, 2018</p>
        </header>
        <Sidebar />
        <Articles />
        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  country: PropTypes.instanceOf(Object).isRequired,
  fetchArticles: PropTypes.func.isRequired,
  resetArticles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  country: state.articles.country,
});

export default connect(mapStateToProps, { fetchArticles, resetArticles })(Index);
