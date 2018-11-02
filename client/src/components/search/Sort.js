import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getParams, numberWithCommas } from '../../_utils';

import styles from '../../styles/search/Sort.scss';

const Sort = ({ totalResults, onChange, location: { search } }) => {
  const { query, ...options } = getParams(search);
  const resultWord = totalResults === 0 || totalResults === 1 ? 'result' : 'results';
  const message = `${numberWithCommas(totalResults)} ${resultWord} for: `;
  return (
    <div className={styles.sort}>
      <p>
        {message}
        <strong>{query}</strong>
      </p>
      <div>
        <label htmlFor="sorting">
          <p>Sort by:</p>
          <select name="sortBy" id="sorting" className={styles.select} value={options.sortBy} onChange={onChange}>
            <option value="date">Date</option>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
          </select>
        </label>
      </div>
    </div>
  );
};

Sort.propTypes = {
  totalResults: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  totalResults: state.articles.totalResults,
});

export default withRouter(connect(mapStateToProps)(Sort));
