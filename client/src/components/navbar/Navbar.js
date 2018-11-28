import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logOut } from '../../actions/userActions';
import toggleSidebar from '../../actions/layoutActions';

import SearchNav from './SearchNav';
import CountryDropdown from './CountryDropdown';
import styles from '../../styles/navbar/Navbar.scss';

// eslint-disable-next-line no-shadow
const Navbar = ({ isAuthenticate, logOut, toggleSidebar, sidebarOpen }) => (
  <nav id={styles.nav}>
    <ul>
      <div className={styles.navMenu}>
        {/* No key navigation because device size < tablet */
        /* eslint-disable-next-line */}
        <li
          id={styles.menu}
          aria-label="menu button"
          role="menuitem"
          tabIndex="0"
          onClick={() => toggleSidebar(!sidebarOpen)}
        >
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
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  Sign up
                </Link>
              </li>
            </Fragment>
          ) : (
            <li>
              <button type="button" onClick={() => logOut()}>
                Log out
              </button>
            </li>
          )
        }
        <li><SearchNav /></li>
        <li><CountryDropdown /></li>
      </div>
    </ul>
  </nav>
);

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  isAuthenticate: PropTypes.bool.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticate: state.user.isAuthenticate,
  sidebarOpen: state.layout.sidebarOpen,
});

export default connect(mapStateToProps, { logOut, toggleSidebar })(Navbar);
