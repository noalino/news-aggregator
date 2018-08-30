import React from 'react';
import Topics from './Topics';
import Bookmarks from './Bookmarks';
import styles from '../styles/Sidebar.scss';

const Sidebar = ({ isSidebarOpen, handleClickTopic, toggleSidebar }) => {
  return (
    <div className={isSidebarOpen ? styles.sidebarOpen : styles.sidebar}>
      <div className={styles.sidebar__list}>
        <Topics onClick={handleClickTopic}/>
        <Bookmarks />
        {/*<Bookmarks bookmarks={bookmarks} onDrop={this.handleDrop}/>*/}
      </div>
      <div className={styles.sidebar__clickCatcher} onClick={toggleSidebar}></div>
    </div>
  );
}

export default Sidebar;