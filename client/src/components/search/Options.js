import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from '../../styles/search/Options.scss';

class Options extends Component {
  state = {
    optionsOpen: false,
  }

  triggerOptions = () => {
    this.setState(prevState => ({
      optionsOpen: !prevState.optionsOpen,
    }));
  }

  render() {
    const { optionsOpen } = this.state;
    const { onChange, sources, options } = this.props;
    const { from, to, source } = options;

    return (
      <div className={styles.container}>
        <button type="button" className={styles.optionsBtn} onClick={this.triggerOptions}>
          {optionsOpen ? 'Hide ' : 'Show '}
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
                  // ONE MONTH AGO (FROM API DEV REQUIREMENTS)
                  min={moment().subtract(1, 'months').format('YYYY-MM-DD')}
                  max={to || moment().format('YYYY-MM-DD')}
                  onChange={e => onChange(e)}
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
                  onChange={e => onChange(e)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="source">
                <p>Source:</p>
                <select name="source" id="source" value={source} onChange={e => onChange(e)} size="1">
                  <option value="">All</option>
                  {sources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  sources: PropTypes.instanceOf(Array).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  sources: state.articles.sources,
  options: state.articles.options,
});

export default connect(mapStateToProps)(Options);
