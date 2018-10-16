/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logIn, signUp } from '../../actions/userActions';
import styles from '../../styles/layout/Login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errMessage: '',
      loading: false,
    };

    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { username, password, loading } = this.state;
    const { isRegistered, isAuthenticated, logIn, error, message, log } = this.props;

    if (error && message !== prevProps.message) {
      this.setState({
        password: '',
        errMessage: message,
      });
      this.usernameInput.current.focus();
    }
    // Log in when user has successfully signed up
    if (!error && isRegistered && !isAuthenticated) {
      logIn({ username, password });
    }
    // Stop loading when user is authenticated
    if ((error || isAuthenticated) && loading) {
      this.setState({ loading: false });
    }
    // Reset credentials when user switches between Login & Signup
    if (log !== prevProps.log) {
      this.setState({
        username: '',
        password: '',
        errMessage: '',
      });
      this.usernameInput.current.focus();
    }
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { log, logIn, signUp } = this.props;

    this.setState({ loading: true }, () => (
      log === 'login' ? logIn({ username, password }) : signUp({ username, password })
    ));
  }

  render() {
    const { username, password, loading, errMessage } = this.state;
    const { log, isAuthenticated } = this.props;

    return (
      isAuthenticated
        ? <Redirect to="/" />
        : (
          <div className={styles.login}>
            <p>{errMessage}</p>
            <form className={styles.loginForm} onSubmit={this.onSubmit}>
              <label htmlFor="username">
                Username
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={this.usernameInput}
                  value={username}
                  maxLength="18"
                  onChange={this.handleChangeInput}
                  placeholder="Username"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  required
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={this.passwordInput}
                  value={password}
                  minLength="8"
                  maxLength="32"
                  onChange={this.handleChangeInput}
                  placeholder="Password"
                  required
                />
              </label>
              <p>Password must contain at least 8 characters</p>
              <button type="submit">
                {/* Insert spinner instead of 'loading'
                    Use Transition to show login check before redirecting */}
                {/* eslint-disable-next-line no-nested-ternary */}
                {loading ? 'Loading' : (log === 'login' ? 'Log in' : 'Create account')}
              </button>
            </form>
            {
              log === 'signup'
              && (
                <p>
                  Already have an account ?
                  {' '}
                  <Link to="/login">Sign in here!</Link>
                </p>
              )
            }
          </div>
        )
    );
  }
}

Login.defaultProps = {
  message: '',
};

Login.propTypes = {
  log: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  logIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isRegistered: state.user.isRegistered,
  error: state.user.error,
  message: state.user.message,
});

export default connect(mapStateToProps, { logIn, signUp })(Login);
