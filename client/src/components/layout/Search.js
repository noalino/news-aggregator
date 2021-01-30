/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArticles, searchArticles, fetchSources, resetArticles } from '../../actions/articlesActions';
import { getParams } from '../../_utils';

import SearchForm from '../search/SearchForm';
import BookmarkButton from '../sidebar/BookmarkButton';
import Articles from '../articles/Articles';
import Footer from './Footer';

import styleGrid from '../../styles/helpers/_layout.scss';

// 'export' for test purposes (not connected to Redux store)
export class Search extends Component {
  state = { optionsOpen: false };

  componentDidMount() {
    const {
      country,
      language,
      fetchSources,
      location: { search },
    } = this.props;
    // const { query, ...options } = getParams(search);
    const { q: query, ...options } = getParams(search);

    fetchSources({ country, language });

    if (query) {
      const { fetchArticles, searchArticles, pageSize } = this.props;
      fetchArticles(searchArticles, {
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
    // const { query, ...options } = getParams(search);
    const { q: query, ...options } = getParams(search);

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
      fetchArticles,
      searchArticles,
      resetArticles,
      location: { search },
      language,
      pageSize,
    } = this.props;
    // const { query } = getParams(search);
    const { q: query } = getParams(search);

    return query ? (
      fetchArticles(searchArticles, {
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
      <div className={styleGrid.showcase}>
        <SearchForm key={search} optionsOpen={optionsOpen} toggleOptions={this.toggleOptions} />
        <BookmarkButton />
        <Articles />
        <Footer />
      </div>
    );
  }
}

Search.propTypes = {
  country: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  fetchArticles: PropTypes.func.isRequired,
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
  fetchArticles,
  searchArticles,
  fetchSources,
  resetArticles,
})(Search);
