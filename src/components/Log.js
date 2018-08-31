import React from 'react';
import styles from '../styles/Log.scss';

const Log = () => {
  return (
    <form className={styles.logForm}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Enter your email address" required></input>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder="Enter your password" required></input>
      <button>Log in / Sign up</button>
    </form>
  );
}

export default Log;