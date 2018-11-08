import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Topics from './Topics';
import Buttons from './Buttons';
import styles from '../../styles/sidebar/Sidebar.scss';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
    };
    this.timeOutId = null;
  }

  toggleSidebar = (e) => { // Use Redux (to toggle from Navbar also)
    e.preventDefault();
    /** Add accessibility with keyDown or keyPress (DOWN key) */
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // Close sidebar when not active
  onBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({ isOpen: false });
    });
  }

  onFocusHandler = () => {
    clearTimeout(this.timeOutId);
  }

  render() {
    const { isOpen } = this.state;
    const { view } = this.props;
    /** SEE COUNTRYDROPDOWN TO CLOSE SIDEBAR ON CLICK OUTSIDE AREA */
    return (
      <div className={styles.sidebar} status={isOpen ? 'open' : 'close'}>
        <div
          className={styles.sidebar__content}
          onBlur={this.onBlurHandler}
          onFocus={this.onFocusHandler}
        >
          <Topics view={view} />
          <Buttons />
        </div>
        <div
          // role="button"
          // tabIndex="0"
          className={styles.sidebar__clickCatcher}
          // onClick={this.toggleSidebar}
          // onKeyDown={this.toggleSidebar}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  view: PropTypes.string.isRequired,
};

export default Sidebar;
