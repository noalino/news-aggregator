import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logOut } from '../../actions/userActions';

import SearchNav from './SearchNav';
import CountryDropdown from './CountryDropdown';
import styles from '../../styles/navbar/Navbar.scss';

class Navbar extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logOut(); // eslint-disable-line react/destructuring-assignment
  }

  render() {
    const { isAuthenticate } = this.props;
    return (
      <nav id={styles.nav}>
        <ul>
          <div>
            <li id={styles.menu} aria-label="menu button" role="menuitem">
              <div />
              <div />
              <div />
            </li>
            <li>
              <Link to="/" id={styles.logo}>News</Link>
            </li>
          </div>
          <div className={styles.navActions}>
            {
              !isAuthenticate ? (
                <Fragment>
                  <li>
                    <Link to="/login">
                      {/* <i className="fas fa-sign-in-alt" /> */}
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      {/* <i className="fas fa-sign-in-alt" /> */}
                      Sign up
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <li>
                  <button type="button" onClick={this.logout}>
                    {/* <i className="fas fa-sign-out-alt" /> */}
                    Log out
                  </button>
                </li>
              )
            }
            <li>
              <SearchNav />
            </li>
            <li>
              <CountryDropdown />
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  isAuthenticate: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticate: state.user.isAuthenticate,
});

export default connect(mapStateToProps, { logOut })(Navbar);
