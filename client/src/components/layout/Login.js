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
    const { logAction, resetLogin } = this.props;
    const { logAction: prevLogAction } = prevProps;
    if (logAction !== prevLogAction) {
      resetLogin();
    }
  }

  render() {
    const { logAction, isAuthenticate, errMessage } = this.props;
    return (
      isAuthenticate ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.container}>
          <div className={styles.login}>
            <i className="far fa-user" />
            <p>{errMessage}</p>
            {/* <p>Username already exists</p> */}
            <LoginForm key={logAction} logAction={logAction} />
          </div>
          {
            logAction === 'login'
            && (
              <p className={styles.redirect}>
                Don&apos;t have an account?
                {' '}
                <Link to="/signup"><strong>Sign up here!</strong></Link>
              </p>
            )
          }
        </div>
      )
    );
  }
}

Login.propTypes = {
  logAction: PropTypes.string.isRequired,
  isAuthenticate: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
  resetLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticate: state.user.isAuthenticate,
  errMessage: state.user.errMessage,
});

export default connect(mapStateToProps, { resetLogin })(Login);
