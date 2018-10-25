/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles, fetchSources, resetArticles } from '../../actions/articlesActions';
import { getParams } from '../../_utils';

import SearchForm from '../search/SearchForm';
import Buttons from '../sidebar/Buttons';
import Articles from '../articles/Articles';
import Footer from './Footer';
import styles from '../../styles/layout/Search.scss';

// 'export' for test purposes (not connected to Redux store)
export class Search extends Component {
  state = {
    optionsOpen: false,
  };

  componentDidMount() {
    const {
      country,
      language,
      fetchSources,
      location: { search },
    } = this.props;
    const { query, ...options } = getParams(search);
    console.log('Search component mounting');

    fetchSources({ country, language });

    if (query) {
      const { searchArticles, pageSize } = this.props;
      searchArticles({
        query,
        options,
        pageSize,
        language,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { country, language, fetchSources, location } = this.props;
    const { search } = location;
    const { search: prevSearch } = prevProps.location;
    const { query, ...options } = getParams(search);

    if (country !== prevProps.country) {
      // Fetch source list & reset source when language changes
      fetchSources({ country, language });
      this.handleReqChange({ ...options, source: '' });
    } else if (search !== prevSearch) {
      this.handleReqChange(options);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.resetArticles();
  }

  handleReqChange = (options) => {
    const {
      searchArticles,
      resetArticles,
      location: { search },
      language,
      pageSize,
    } = this.props;
    const { query } = getParams(search);

    return query ? (
      searchArticles({
        query,
        options,
        pageSize,
        language,
      })
    ) : resetArticles();
  }

  toggleOptions = () => {
    this.setState(prevState => ({
      optionsOpen: !prevState.optionsOpen,
    }));
  }

  render() {
    const { optionsOpen } = this.state;
    const { location: { search } } = this.props;
    return (
      <div className={styles.showcase}>
        <SearchForm key={search} optionsOpen={optionsOpen} toggleOptions={this.toggleOptions} />
        {/* <SearchForm /> */}
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
};

const mapStateToProps = state => ({
  country: state.articles.country.code,
  language: state.articles.country.language.code,
  pageSize: state.articles.pageSize,
});

export default connect(mapStateToProps, {
  searchArticles,
  fetchSources,
  resetArticles,
})(Search);
