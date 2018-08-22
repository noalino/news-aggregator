import React from 'react';
import style from '../styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <button>
        <i className="fas fa-star"></i>
        <h3>My Favorites</h3>
      </button>
      <button>
        <i className="fas fa-bookmark"></i>
        <h3>Bookmarks</h3>
      </button>
      <div className={style.drop_area}>
        <p>Drop your articles here</p>
      </div>
    </div>
  );
}

export default Sidebar;