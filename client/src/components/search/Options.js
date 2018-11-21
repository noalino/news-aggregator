import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';
import { minSearchDate, dateFormat } from '../../_utils';

import styles from '../../styles/search/Options.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Options = ({
  onChange,
  onDateChange,
  sources,
  options,
  optionsOpen,
  toggleOptions,
  resetOptions,
}) => {
  const { from, to, source } = options;
  return (
    <div className={styles.container}>
      <button type="button" className={styles.optionsBtn} onClick={toggleOptions}>
        Advanced Search
      </button>
      {optionsOpen && (
        <div className={styles.options}>
          <label htmlFor="from">
            <p>From:</p>
            <DatePicker
              id="from"
              className={styles.date}
              selected={from}
              onChange={date => onDateChange('from', date)}
              dateFormat={dateFormat}
              minDate={minSearchDate}
              maxDate={to || moment()}
              showDisabledMonthNavigation
              placeholderText={`${minSearchDate.format(dateFormat)}`}
            />
          </label>
          <label htmlFor="to">
            <p>To:</p>
            <DatePicker
              id="to"
              className={styles.date}
              selected={to}
              onChange={date => onDateChange('to', date)}
              dateFormat={dateFormat}
              minDate={from || minSearchDate}
              maxDate={moment()}
              showDisabledMonthNavigation
              placeholderText={`${moment().format(dateFormat)}`}
            />
          </label>
          <label htmlFor="source">
            <p>Source:</p>
            <select name="source" id="source" value={source} onChange={onChange}>
              <option value="">All</option>
              {sources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
            </select>
          </label>
          <button type="button" onClick={resetOptions}>Reset</button>
        </div>
      )}
    </div>
  );
};

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
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
