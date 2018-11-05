import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from '../../styles/search/Options.scss';

const Options = ({ onChange, sources, options, optionsOpen, toggleOptions, resetOptions }) => {
  const { from, to, source } = options;
  return (
    <div className={styles.container}>
      <button type="button" className={styles.optionsBtn} onClick={toggleOptions}>
        Advanced Search
      </button>
      {optionsOpen && (
        <div className={styles.options}>
          <div>
            <label htmlFor="from">
              <p>From:</p>
              <input
                type="date"
                name="from"
                id="from"
                value={from}
                // ONE MONTH AGO (FROM NEWSAPI DEV REQUIREMENTS)
                min={moment().subtract(1, 'months').format('YYYY-MM-DD')}
                max={to || moment().format('YYYY-MM-DD')}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="to">
              <p>To:</p>
              <input
                type="date"
                name="to"
                id="to"
                value={to}
                min={from || moment().subtract(1, 'months').format('YYYY-MM-DD')}
                max={moment().format('YYYY-MM-DD')}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="source">
              <p>Source:</p>
              <select name="source" id="source" value={source} onChange={onChange}>
                <option value="">All</option>
                {sources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
              </select>
            </label>
          </div>
          <button type="button" onClick={resetOptions}>Reset</button>
        </div>
      )}
    </div>
  );
};

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  sources: PropTypes.instanceOf(Array).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  optionsOpen: PropTypes.bool.isRequired,
  toggleOptions: PropTypes.func.isRequired,
  resetOptions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sources: state.articles.sources,
});

export default connect(mapStateToProps)(Options);
