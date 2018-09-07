import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCountry } from '../../actions/newsActions';

import Icon from './Icon';
import styles from '../../styles/layout/CountryDropdown.scss';

class CountryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  triggerDropdown = e => {
    e.preventDefault();
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  handleClick = (country, e) => {
    const { changeCountry } = this.props;
    changeCountry(country);
    this.triggerDropdown(e);
  }

  render() {
    /** Chinese flag to repair */
    const { isOpen } = this.state;
    const { country } = this.props;
    
    return (
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={this.triggerDropdown}>
          <Icon className="country" country={country}/>
          <i className="fa fa-caret-down"></i>
        </button>

        {
          isOpen &&
          <ul className={styles.dropdownContent}>
            {this.props.countries.map(country => (
              <li key={country} onClick={this.handleClick.bind(this, country)}>
                <Icon className="country" country={country}/>
              </li>
            ))}
          </ul>
        }

      </div> 
    )
  }
}

CountryDropdown.defaultProps = {
  countries: ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']
}

CountryDropdown.propTypes = {
  country: PropTypes.string.isRequired,
  changeCountry: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  country: state.news.country
});

export default connect(mapStateToProps, { changeCountry })(CountryDropdown);