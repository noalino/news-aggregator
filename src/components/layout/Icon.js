import React from 'react';
import '../../assets/images/flags.svg';
import styles from '../../styles/layout/Icon.scss';

const Icon = ({ className, country }) => {
  return (
    <svg className={styles[className]}>
      <use xlinkHref={`#flags_${country}`}/>
    </svg>
  )
}

export default Icon;