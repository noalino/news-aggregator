/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import toggleSidebar from '../../actions/layoutActions';

import Topics from './Topics';
import BookmarkButton from './BookmarkButton';
import styles from '../../styles/sidebar/Sidebar.scss';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => (
  <Transition in={sidebarOpen} timeout={150}>
    {state => (
      <div className={styles.sidebar} state={state}>
        <div className={styles.sidebar__content}>
          <Topics sidebar />
          <BookmarkButton sidebar />
        </div>
        <div
          role="presentation"
          className={styles.sidebar__clickCatcher}
          onClick={() => toggleSidebar(false)}
        />
      </div>
    )}
  </Transition>
);

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sidebarOpen: state.layout.sidebarOpen,
});

export default connect(mapStateToProps, { toggleSidebar })(Sidebar);
