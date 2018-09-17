import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

import CountryDropdown from './CountryDropdown';
import styles from '../../styles/layout/Navbar.scss';

class Navbar extends Component {
  state = { query: '' };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  redirectToSearch = e => {
    e.preventDefault();
    const { history } = this.props;
    const { query } = this.state;

    if (query !== '') {
      history.push(`/search?q=${encodeURIComponent(query)}`);
      this.setState({ query: ''});
    } else {
      history.push('/search');
    }
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
        <form onSubmit={this.redirectToSearch}>
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
  history: PropTypes.object.isRequired
}

export default withRouter(Navbar);