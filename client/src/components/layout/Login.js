import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logIn, signUp } from '../../actions/authActions';
import styles from '../../styles/layout/Login.scss';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidUpdate() {
    const { isRegistered, isAuthenticated, logIn } = this.props;
    if (isRegistered && !isAuthenticated) {
      logIn(this.state);
    }
  }

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = e => {
    e.preventDefault();
    const { log, logIn, signUp } = this.props;
    // log === 'login' ? logIn(this.state) : signUp(this.state);
    if (log === 'login') {
      logIn(this.state);
    } else if (log === 'signup') {
      signUp(this.state);
    }
  }

  render() {
    const { username, password } = this.state;
    const { log, location, isAuthenticated, isRegistered, info } = this.props;
    const { from } = location.state || { from: { pathname: "/" } };

    if (isAuthenticated) {
      return <Redirect to={from} />
    } else {
      // const action = isRegistered ? info : log === 'login' ? 'Log in' : 'Create account';
      return (
        <form className={styles.logForm} onSubmit={this.onSubmit}>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={this.handleChangeInput}
            placeholder="Enter your username here"
            required
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleChangeInput}
            placeholder="Enter your password here"
            required
          ></input>
          <button>
            {isRegistered ? info : log === 'login' ? 'Log in' : 'Create account'}
          </button>
  
          {
            log === 'signup' &&
            <p>
              Already have an account?{" "}
              <Link to="/login">Sign in here!</Link>
            </p>
          }
        </form>
      );
    }
  }
}

Login.propTypes = {
  log: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  info: PropTypes.string,
  logIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isRegistered: state.auth.isRegistered,
  info: state.auth.info
});

export default connect(mapStateToProps, { logIn, signUp })(Login);