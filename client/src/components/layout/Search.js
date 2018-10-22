/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles, updateOptions, fetchSources, resetArticles } from '../../actions/articlesActions';
import { getQuery, isEqual } from '../../_utils';

import SearchForm from '../search/SearchForm';
import Buttons from '../sidebar/Buttons';
import Articles from '../articles/Articles';
import Footer from './Footer';
import styles from '../../styles/layout/Search.scss';

// 'export' for test purposes (not connected to Redux store)
export class Search extends Component {
  componentDidMount() {
    const {
      country,
      language,
      fetchSources,
      location: { search },
    } = this.props;
    const query = getQuery(search);
    console.log('Search component mounting');

    fetchSources({ country, language });

    if (query) {
      const { searchArticles, pageSize, options } = this.props;
      searchArticles({
        query,
        options,
        pageSize,
        language,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { country, language, fetchSources, location, options } = this.props;
    const { search, state } = location;
    const { search: prevLocSearch, state: prevLocState } = prevProps.location;

    // Fetch source list & reset source when language changes
    if (country !== prevProps.country) {
      console.log('language changed');
      fetchSources({ country, language });
      this.handleReqChange({ ...options, source: '' });

    // Handle query coming from nav searchbar or from URL
    } else if (state === undefined && search !== prevLocSearch) {
      console.log('nav searchbar request');
      this.handleReqChange(options);

    // Handle query coming from main searchbar
    } else if (state !== undefined && (search !== prevLocSearch || !isEqual(state, prevLocState))) {
      console.log('main searchbar request');
      this.handleReqChange(state);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resetArticles();
  }

  // Search articles if query !== ''
  handleReqChange = (options) => {
    const {
      searchArticles,
      updateOptions,
      resetArticles,
      location: { search },
      language,
      pageSize,
    } = this.props;
    const query = getQuery(search);

    updateOptions(options);

    return query ? (
      searchArticles({
        query,
        options,
        pageSize,
        language,
      })
    ) : resetArticles();
  }

  render() {
    return (
      <div className={styles.showcase}>
        <SearchForm sortChange={this.handleReqChange} />
        <Buttons />
        <Articles />
        <Footer />
      </div>
    );
  }
}

Search.propTypes = {
  country: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  searchArticles: PropTypes.func.isRequired,
  fetchSources: PropTypes.func.isRequired,
  resetArticles: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  pageSize: PropTypes.number.isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  updateOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  country: state.articles.country.code,
  language: state.articles.country.language.code,
  pageSize: state.articles.pageSize,
  options: state.articles.options,
});

export default connect(mapStateToProps, {
  searchArticles,
  updateOptions,
  fetchSources,
  resetArticles,
})(Search);
