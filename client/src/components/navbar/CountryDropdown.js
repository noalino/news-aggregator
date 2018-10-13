import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCountry } from '../../actions/articlesActions';

// import Icon from './Icon';
import flag_fr from '../../assets/images/flags-min/fr.png';
import flag_es from '../../assets/images/flags-min/es.png';
import flag_de from '../../assets/images/flags-min/de.png';
import flag_gb from '../../assets/images/flags-min/gb.png';
import flag_us from '../../assets/images/flags-min/us.png';
import styles from '../../styles/navbar/CountryDropdown.scss';

class CountryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggleButton = React.createRef();
    this.countryList = React.createRef();
    this.timeOutId = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen && this.state.isOpen !== prevState.isOpen) {
      document.addEventListener('keydown', this.keyNavigation);
    } else if (!this.state.isOpen && this.state.isOpen !== prevState.isOpen) {
      document.removeEventListener('keydown', this.keyNavigation);
    }
  }

  triggerDropdown = e => {
    e.preventDefault();
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  keyNavigation = e => {
    const { activeElement } = document;
    const firstItem = this.countryList.current.firstChild;
    const lastItem = this.countryList.current.lastChild;

    switch (e.which) {
      case 13: // ENTER key
        const country = this.props.countries.find(item => item.code === activeElement.id);
        this.handleClick(country, e);
        break;
      case 38: // UP arrow key
        e.preventDefault();
        // Stop script if focus on toggle element
        if (activeElement === this.toggleButton.current) { break; }
        else if (activeElement === firstItem) { lastItem.focus(); }
        else { activeElement.previousSibling.focus(); }
        break;
      case 40: // DOWN arrow key
        e.preventDefault();
        if (activeElement === this.toggleButton.current || activeElement === lastItem) {
          firstItem.focus();
        }
        else { activeElement.nextSibling.focus(); }
        break;
    }
  }

  handleClick = (country, e) => {
    const { changeCountry } = this.props;
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

  getFlagImg = country => {
    switch(country) {
      case 'de': return flag_de;
      case 'fr': return flag_fr;
      case 'es': return flag_es;
      case 'gb': return flag_gb;
      case 'us': return flag_us;
    }
  }

  render() {
    const { isOpen } = this.state;
    const { country } = this.props;
    
    return (
      <div className={styles.dropdown} onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button 
          ref={this.toggleButton}
          className={styles.dropbtn}
          onClick={this.triggerDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {/* <Icon className="country" country={country.code}/> */}
          <img src={this.getFlagImg(country.code)} alt={country.name} />
          <i className="fa fa-caret-down"/>
        </button>

        {
          isOpen &&
          <ul className={styles.dropdownContent} ref={this.countryList}>
            {this.props.countries.map(country => (
              <li 
                key={country.code}
                id={country.code}
                tabIndex="0"
                onClick={this.handleClick.bind(this, country)}
              >
                {/* <Icon className="country" country={country.code}/> */}
                <img src={this.getFlagImg(country.code)} alt={country.name}/>
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
  country: state.articles.country
});

export default connect(mapStateToProps, { changeCountry })(CountryDropdown);