import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCountry } from '../../actions/articlesActions';

import flagFr from '../../assets/images/flags/fr.png';
// import flagEs from '../../assets/images/flags/es.png';
import flagDe from '../../assets/images/flags/de.png';
import flagGb from '../../assets/images/flags/gb.png';
import flagUs from '../../assets/images/flags/us.png';
import styles from '../../styles/navbar/CountryDropdown.scss';

class CountryDropdown extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.toggleButton = React.createRef();
    this.countryList = React.createRef();
    this.timeOutId = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.state;
    if (isOpen && isOpen !== prevState.isOpen) {
      document.addEventListener('keydown', this.keyNavigation);
    } else if (!isOpen && isOpen !== prevState.isOpen) {
      document.removeEventListener('keydown', this.keyNavigation);
    }
  }

  triggerDropdown = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  keyNavigation = (e) => {
    const { activeElement } = document;
    const firstItem = this.countryList.current.firstChild;
    const lastItem = this.countryList.current.lastChild;

    switch (e.which) {
      case 13: { // ENTER key
        if (activeElement === this.toggleButton.current) {
          this.triggerDropdown(e);
        } else {
          const { countries } = this.props;
          const country = countries.find(item => item.code === activeElement.id);
          this.handleClick(country, e);
        }
        break;
      }
      case 38: // UP arrow key
        e.preventDefault();
        // Stop script if focus on toggle element
        if (activeElement === this.toggleButton.current) {
          break;
        } else if (activeElement === firstItem) {
          lastItem.focus();
        } else {
          activeElement.previousSibling.focus();
        }
        break;
      case 40: // DOWN arrow key
        e.preventDefault();
        if (activeElement === this.toggleButton.current || activeElement === lastItem) {
          firstItem.focus();
        } else {
          activeElement.nextSibling.focus();
        }
        break;
      default:
        break;
    }
  }

  handleClick = (country, e) => {
    const { changeCountry } = this.props; // eslint-disable-line no-shadow
    changeCountry(country);
    this.triggerDropdown(e);
  }

  // Close dropdown when not active
  onBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({ isOpen: false });
    });
  }

  onFocusHandler = () => {
    clearTimeout(this.timeOutId);
  }

  getFlagImg = (country) => {
    switch (country) {
      case 'de': return flagDe;
      case 'fr': return flagFr;
      // case 'es': return flagEs;
      case 'gb': return flagGb;
      case 'us': return flagUs;
      default: return flagUs;
    }
  }

  render() {
    const { isOpen } = this.state;
    const { countries, country } = this.props;

    return (
      <div className={styles.dropdown} onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button
          type="button"
          ref={this.toggleButton}
          className={styles.dropbtn}
          onClick={this.triggerDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <img className={styles.flag} src={this.getFlagImg(country.code)} alt={country.name} />
          <i className={`fa fa-caret-${isOpen ? 'up' : 'down'}`} />
        </button>

        {
          isOpen && (
            <ul className={styles.dropdownContent} ref={this.countryList}>
              {countries.map(ctry => (
                // eslint-disable-next-line
                <li
                  key={ctry.code}
                  id={ctry.code}
                  className={styles.country}
                  tabIndex="0"
                  onClick={this.handleClick.bind(this, ctry)}
                >
                  <img className={styles.flag} src={this.getFlagImg(ctry.code)} alt={ctry.name} />
                </li>
              ))}
            </ul>
          )
        }

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
    /** ONLY AVAILABLE FOR SEARCH ARTICLES */
    // {
    //   code: 'es',
    //   name: 'Spain',
    //   language: {
    //     code: 'es',
    //     name: 'Español',
    //   },
    // },
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
