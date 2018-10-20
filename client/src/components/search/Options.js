import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
                <input type="date" name="from" id="from" value={options.from} onChange={e => onChange(e)} />
              </label>
            </div>
            <div>
              <label htmlFor="to">
                <p>To:</p>
                <input type="date" name="to" id="to" value={options.to} onChange={e => onChange(e)} />
              </label>
            </div>
            <div>
              <label htmlFor="source">
                <p>Source:</p>
                <select name="source" id="source" value={options.source} onChange={e => onChange(e)} size="1">
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
