import React, { Component } from 'react';
import '../../assets/images/flags.svg';
import styles from '../../styles/layout/CountryDropdown.scss';

class CountryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'us',
      isOpen: false
    }
  }

  handleClick = e => {
    e.preventDefault();
    console.log('click');
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  render() {
    const { country, isOpen } = this.state;
    return (
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={this.handleClick}>
          <svg width="40" height="30">
            <use xlinkHref={`#flags_${country}`}/>
          </svg>
          <i className="fa fa-caret-down"></i>
        </button>
        {isOpen &&
        <ul className={styles.dropdownContent} id="myDropdown">
          {this.props.countries.map(country => (
            <li key={country}>
              <svg width="40" height="30">
                <use xlinkHref={`#flags_${country}`} />
              </svg>
            </li>
          ))}
        </ul>}
      </div> 
    )
  }
}

CountryDropdown.defaultProps = {
  countries: ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']
}

export default CountryDropdown;