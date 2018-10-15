import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/images/flags.svg';
import styles from '../../styles/navbar/Icon.scss';

const Icon = ({ className, country }) => (
  <svg className={styles[className]}>
    <use xlinkHref={`#flags_${country}`} />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  country: PropTypes.instanceOf(Object).isRequired,
};

export default Icon;
