import React from 'react';
import style from '../styles/Header.scss';

const Header = ({ isSidebarOpen }) => {
  return (
    !isSidebarOpen && 
    <header className={style.header}>
      <h1 className={style.title}>Top Stories</h1>
      <p className={style.date}>Monday, August 20, 2018</p>
    </header>
  );
}

export default Header;