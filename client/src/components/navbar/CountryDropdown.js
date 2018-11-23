import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCountry } from '../../actions/articlesActions';

import flagFr from '../../assets/images/flags/fr.png';
import flagDe from '../../assets/images/flags/de.png';
import flagGb from '../../assets/images/flags/gb.png';
import flagUs from '../../assets/images/flags/us.png';
import styles from '../../styles/navbar/CountryDropdown.scss';

class CountryDropdown extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
    this.toggleButton = React.createRef();
    this.countryList = React.createRef();
  }
  /* To close list on click outside of it */
  // componentDidMount() {
  //   document.addEventListener('mousedown', this.handleClick);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClick);
  // }

  toggleDropdown = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  handleCountryClick = (country) => {
    const { changeCountry } = this.props; // eslint-disable-line no-shadow
    changeCountry(country);
    this.toggleDropdown();
  }

  keyNavigation = (e) => {
    const { isOpen } = this.state;

    if (isOpen) {
      const activeElement = e.target;
      const { firstChild } = this.countryList.current;
      const { lastChild } = this.countryList.current;

      switch (e.which) {
        case 13: { // ENTER key
          if (activeElement !== this.toggleButton.current) {
            const { countries } = this.props;
            const country = countries.find(item => item.code === activeElement.id);
            this.handleCountryClick(country);
          }
          break;
        }
        case 38: // UP arrow key
          e.preventDefault();
          if (activeElement === firstChild) {
            lastChild.focus();
          } else if (activeElement !== this.toggleButton.current) {
            activeElement.previousSibling.focus();
          }
          break;
        case 40: // DOWN arrow key
          e.preventDefault();
          if (activeElement === this.toggleButton.current || activeElement === lastChild) {
            firstChild.focus();
          } else {
            activeElement.nextSibling.focus();
          }
          break;
        default:
          break;
      }
    }
  }

  getFlagImg = (country) => {
    switch (country) {
      case 'de': return flagDe;
      case 'fr': return flagFr;
      case 'gb': return flagGb;
      case 'us': return flagUs;
      default: return flagUs;
    }
  }

  render() {
    const { isOpen } = this.state;
    const { countries, country } = this.props;

    return (
      <div className={styles.dropdown}>
        <button
          type="button"
          ref={this.toggleButton}
          className={styles.dropbtn}
          onClick={this.toggleDropdown}
          onKeyDown={this.keyNavigation}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <img className={styles.flag} src={this.getFlagImg(country.code)} alt={country.name} />
        </button>

        {isOpen && (
          <ul className={styles.dropdownContent} ref={this.countryList}>
            {countries.map(ctry => (
              <li
                key={ctry.code}
                id={ctry.code}
                className={styles.country}
                role="menuitem"
                tabIndex="0"
                onClick={() => this.handleCountryClick(ctry)}
                onKeyDown={this.keyNavigation}
              >
                <img className={styles.flag} src={this.getFlagImg(ctry.code)} alt={ctry.name} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

CountryDropdown.defaultProps = {
  countries: [
    {
      code: 'fr',
      name: 'France',
      language: {
        code: 'fr',
        name: 'Français',
      },
    },
    {
      code: 'de',
      name: 'Germany',
      language: {
        code: 'de',
        name: 'Deutsch',
      },
    },
    {
      code: 'gb',
      name: 'United Kingdom',
      language: {
        code: 'en',
        name: 'English',
      },
    },
    {
      code: 'us',
      name: 'United States',
      language: {
        code: 'en',
        name: 'English',
      },
    },
  ],
};

CountryDropdown.propTypes = {
  countries: PropTypes.instanceOf(Array),
  country: PropTypes.instanceOf(Object).isRequired,
  changeCountry: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  country: state.articles.country,
});

export default connect(mapStateToProps, { changeCountry })(CountryDropdown);
