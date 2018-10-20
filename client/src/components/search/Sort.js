import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuery } from '../../_utils';

import styles from '../../styles/search/Sort.scss';

const Sort = ({ options, onChange, location: { search } }) => {
  const lastQuery = getQuery(search);
  return (
    <div className={styles.sort}>
      <h3>
        Results for:
        {` ${lastQuery}`}
      </h3>
      <div>
        <label htmlFor="sorting">
          <p>Sort by:</p>
          <select name="sorting" id="sorting" value={options.sorting} size="1" onChange={e => onChange(e)}>
            <option value="publishedAt">Published At</option>
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
          </select>
        </label>
      </div>
    </div>
  );
};

Sort.propTypes = {
  options: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  options: state.articles.options,
});

export default withRouter(connect(mapStateToProps)(Sort));
