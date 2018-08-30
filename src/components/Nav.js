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
      <a href="">News</a>
      <div className={style.links}>
        <a href=""><i className="fas fa-edit"></i><p>Sign Up</p></a>
        <a href=""><i className="fas fa-sign-in-alt"></i><p>Log In</p></a>
        {/*<a href=""><i className="fas fa-sign-out-alt"></i>Log Out</a>*/}
        <form>
          <input type="text" placeholder="Search articles..."/>
          <button><i className="fas fa-search"></i></button>
        </form>
      </div>
    </nav>
  );
}

export default Nav;