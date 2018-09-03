import React from 'react';
import Topics from './Topics';
import Buttons from './Buttons';
import styles from '../../styles/sidebar/Sidebar.scss';

const Sidebar = ({ isSidebarOpen, handleClickTopic, toggleSidebar }) => {
  return (
    <div className={isSidebarOpen ? styles.sidebarOpen : styles.sidebar}>
      <div className={styles.sidebar__list}>
        <Topics onClick={handleClickTopic}/>
        <Buttons />
        {/*<Buttons bookmarks={bookmarks} onDrop={this.handleDrop}/>*/}
      </div>
      <div className={styles.sidebar__clickCatcher} onClick={toggleSidebar}></div>
    </div>
  );
}

export default Sidebar;