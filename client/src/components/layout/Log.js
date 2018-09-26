import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../styles/layout/Log.scss';

class Log extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/user', {...this.state});
  }

  render() {
    const { username, password } = this.state;
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
        <button>Sign In</button>
      </form>
    );
  }
}

export default Log;