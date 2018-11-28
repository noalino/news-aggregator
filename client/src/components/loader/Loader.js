import React from 'react';
import PropTypes from 'prop-types';

import styleGrid from '../../styles/helpers/_article.scss';
import styles from '../../styles/loader/Loader.scss';

const Loader = ({ pageSize }) => {
  const articleTemplates = [];
  for (let i = 0; i < pageSize; i++) {
    articleTemplates.push(
      <div className={`${styleGrid.article} ${styles.article}`} key={i}>
        <i className="fas fa-bookmark" />
        <div className={`${styleGrid.title} ${styles.title}`} />
        <div className={`${styleGrid.info} ${styles.info}`} />
      </div>,
    );
  }
  return articleTemplates;
};

Loader.propTypes = {
  pageSize: PropTypes.number.isRequired,
};

export default Loader;
