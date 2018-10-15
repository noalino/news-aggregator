import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logOut } from '../../actions/userActions';

import CountryDropdown from './CountryDropdown';
import styles from '../../styles/navbar/Navbar.scss';

class Navbar extends Component {
  state = { query: '' };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  redirectToSearch = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { query } = this.state;

    if (query !== '') {
      history.push(`/search?q=${encodeURIComponent(query)}`);
      this.setState({ query: '' });
    } else {
      history.push('/search');
    }
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logOut(); // eslint-disable-line react/destructuring-assignment
  }

  render() {
    const { query } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <nav className={styles.nav}>
        <ul>
          <li className={styles.menu} aria-label="menu button">
            <div />
            <div />
            <div />
          </li>
          <li>
            <Link to="/" className={styles.logo}>News</Link>
          </li>
          {
            !isAuthenticated ? (
              <Fragment>
                <li>
                  <Link to="/login">
                    <i className="fas fa-sign-in-alt" />
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <i className="fas fa-sign-in-alt" />
                    Sign up
                  </Link>
                </li>
              </Fragment>
            ) : (
              <li>
                <button type="button" onClick={this.logout}>
                  <i className="fas fa-sign-out-alt" />
                  Log out
                </button>
              </li>
            )
          }
        </ul>
        <form onSubmit={this.redirectToSearch}>
          <input
            type="search"
            name="query"
            placeholder="Search articles..."
            autoComplete="true"
            aria-label="Search articles"
            value={query}
            onChange={this.handleInputChange}
          />
          <button type="button">
            <i className="fas fa-search" />
          </button>
        </form>
        <CountryDropdown />
      </nav>
    );
  }
}

Navbar.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  logOut: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, { logOut })(Navbar));
