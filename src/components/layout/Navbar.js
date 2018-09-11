import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchArticles } from '../../actions/newsActions';

import CountryDropdown from './CountryDropdown';
import styles from '../../styles/layout/Navbar.scss';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  findArticles = e => {
    e.preventDefault();
    const { history, country, searchArticles } = this.props;

    if (this.state.query !== '') {
      searchArticles({language: country.language.code, ...this.state});
      this.setState({ query: ''});
    }

    history.push('/search');
  }

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.menu} aria-label="menu button">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to="/" className={styles.logo}><h1>News</h1></Link>
        <Link to="/log"><i className="fas fa-sign-in-alt"></i><p>Log in or Sign up</p></Link>
        {/*<i className="fas fa-sign-out-alt"></i><p>Log Out</p>*/}
        <form onSubmit={this.findArticles}>
          <input
            type="search"
            name="query"
            placeholder="Search articles..."
            autoComplete="true"
            aria-label="Search articles"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button><i className="fas fa-search"></i></button>
        </form>
        <CountryDropdown />
      </nav>
    );
  }
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  country: PropTypes.object.isRequired,
  searchArticles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  country: state.news.country
});

export default withRouter(connect(mapStateToProps, { searchArticles })(Navbar));