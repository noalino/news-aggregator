import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/login/Input.scss';

const Password = ({ value, onChange }) => (
  <label htmlFor="password" className={styles.field}>
    <i className="fas fa-lock" />
    <input
      type="password"
      name="password"
      id="password"
      value={value}
      minLength="8"
      onChange={e => onChange(e)}
      placeholder="Password"
      required
    />
  </label>
);

Password.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Password;
