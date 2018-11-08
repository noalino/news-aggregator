import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { toggleSidebar } from '../../actions/layoutActions';

import Topics from './Topics';
import Buttons from './Buttons';
import styles from '../../styles/sidebar/Sidebar.scss';

class Sidebar extends Component {
  constructor() {
    super();
    this.timeOutId = null;
  }

  // Close sidebar when not active
  onBlurHandler = () => {
    const { toggleSidebar } = this.props;
    this.timeOutId = setTimeout(() => {
      // this.setState({ isOpen: false });
      toggleSidebar(false);
    });
  }

  onFocusHandler = () => {
    clearTimeout(this.timeOutId);
  }

  render() {
    const { view, sidebarOpen } = this.props;
    return (
      <Transition in={sidebarOpen} timeout={150}>
        {state => (
          <div className={styles.sidebar} state={state}>
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
        )}
      </Transition>
    );
  }
}

Sidebar.propTypes = {
  view: PropTypes.string.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sidebarOpen: state.layout.sidebarOpen,
});

export default connect(mapStateToProps, { toggleSidebar })(Sidebar);
