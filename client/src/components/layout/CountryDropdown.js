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
    const { isOpen } = this.state;
    const { country } = this.props;
    
    return (
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={this.triggerDropdown}>
          <Icon className="country" country={country.code}/>
          <i className="fa fa-caret-down"></i>
        </button>

        {
          isOpen &&
          <ul className={styles.dropdownContent}>
            {this.props.countries.map(country => (
              <li key={country.code} onClick={this.handleClick.bind(this, country)}>
                <Icon className="country" country={country.code}/>
              </li>
            ))}
          </ul>
        }

      </div> 
    )
  }
}

CountryDropdown.defaultProps = {
  countries: [
    {
      code: 'fr',
      name: 'France',
      language: {
        code: 'fr',
        name: 'Français'
      }
    },
    {
      code: 'de',
      name: 'Germany',
      language: {
        code: 'de',
        name: 'Deutsch'
      }
    },
    {
      code: 'es',
      name: 'Spain',
      language: {
        code: 'es',
        name: 'Español'
      }
    },
    {
      code: 'gb',
      name: 'United Kingdom',
      language: {
        code: 'en',
        name: 'English'
      }
    },
    {
      code: 'us',
      name: 'United States',
      language: {
        code: 'en',
        name: 'English'
      }
    }
  ]
}

CountryDropdown.propTypes = {
  country: PropTypes.object.isRequired,
  changeCountry: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  country: state.news.country
});

export default connect(mapStateToProps, { changeCountry })(CountryDropdown);