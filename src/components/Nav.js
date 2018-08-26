import React from 'react';
import style from '../styles/Nav.scss';

const Nav = () => {
  return (
    <nav className={style.nav}>
      <h1>NEWS</h1>
      <div className={style.links}>
        {/*<a href="">Home</a>*/}
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