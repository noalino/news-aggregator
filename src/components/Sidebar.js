import React from 'react';
import style from '../styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <h3>My Favorites</h3>
      <h3>Bookmarks</h3>
      <div className="drop-area"></div>
    </div>
  );
}

export default Sidebar;