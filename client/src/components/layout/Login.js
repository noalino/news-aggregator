/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetLogin } from '../../actions/userActions';

import LoginForm from '../login/LoginForm';

import styles from '../../styles/layout/Login.scss';

class Login extends Component {
  componentDidUpdate(prevProps) {
    const { location: { pathname }, resetLogin } = this.props;
    const { location: { pathname: prevPathname } } = prevProps;
    /* Empty input fields when view changes (login/signup) */
    if (pathname !== prevPathname) {
      resetLogin();
    }
  }

  render() {
    const { location: { pathname }, isAuthenticate, errMessage } = this.props;
    const logAction = pathname.slice(1);

    if (isAuthenticate) {
      return <Redirect to="/" />;
    }
    return (
      <div className={styles.container}>
        <div className={styles.login}>
          <i className="far fa-user" />
          <p>{errMessage}</p>
          <LoginForm key={logAction} logAction={logAction} />
        </div>
        {logAction === 'login' && (
          <p className={styles.redirect}>
            Don&apos;t have an account?
            {' '}
            <Link to="/signup"><strong>Sign up here!</strong></Link>
          </p>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  isAuthenticate: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
  resetLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticate: state.user.isAuthenticate,
  errMessage: state.user.errMessage,
});

export default connect(mapStateToProps, { resetLogin })(Login);
