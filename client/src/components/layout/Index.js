import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArticles, resetArticles } from '../../actions/articlesActions';

import Sidebar from '../sidebar/Sidebar';
import Articles from '../articles/Articles';
import styles from '../../styles/layout/Index.scss';

class Index extends Component {

  componentDidMount() {  
    const { match: { params: { topic } }, country, fetchArticles } = this.props;
    console.log('Index mounting');

    fetchArticles(country.code, topic); // Thanks to Redirect from '/' to '/general' in App.js
  }

  componentDidUpdate(prevProps) {      
    const { match: { params: { topic } }, country, fetchArticles } = this.props;
    if (topic !== prevProps.match.params.topic || country.code !== prevProps.country.code) {
      console.log('Index updating');

      fetchArticles(country.code, topic);
    }
  }

  componentWillUnmount() {
    this.props.resetArticles();
  }
  
  render() {
    return (
      <React.Fragment>
        <header className={styles.header}>
          <h1 className={styles.title}>Top Stories</h1>
          <p className={styles.date}>Monday, August 20, 2018</p>
        </header>
        <Sidebar />
        <Articles />
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  match: PropTypes.object.isRequired,
  country: PropTypes.object.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  resetArticles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  country: state.articles.country
});

export default connect(mapStateToProps, { fetchArticles, resetArticles })(Index);