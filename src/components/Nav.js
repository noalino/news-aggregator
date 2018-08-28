import React from 'react';
import style from '../styles/Nav.scss';

const Nav = ({ toggleSidebar }) => {
  return (
    <nav className={style.nav}>
      <div className={style.menu} onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <a href="/">News</a>
      <div className={style.links}>
        <a href="">Sign In</a>
        <a href="">Sign Up</a>
        <form>
          <input type="text" placeholder="Search articles..."/>
          <button><i className="fas fa-search"></i></button>
        </form>
      </div>
    </nav>
  );
}

export default Nav;