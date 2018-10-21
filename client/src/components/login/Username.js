import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/login/Input.scss';

const Username = ({ value, onChange }) => (
  <label htmlFor="username" className={styles.field}>
    <i className="fas fa-user" />
    <input
      type="text"
      name="username"
      id="username"
      value={value}
      maxLength="18"
      onChange={e => onChange(e)}
      placeholder="Username"
      required
    />
  </label>
);

Username.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Username;
