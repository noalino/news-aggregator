import React from 'react';
import style from '../styles/Nav.scss';

const Nav = () => {
  return (
    <nav className={style.nav}>
      <h1>NEWS</h1>
      {/*<div className={style.links}>
        <a href="">Home</a>
        <a href=""><p>Sign In</p></a>
        <a href=""><p>Sign Up</p></a>
        <form>
          <input type="text" placeholder="Search articles..."/>
          <button><i className="fas fa-search"></i></button>
        </form>
      </div>*/}
      <ul className={style.links}>
        <li><a href="">Home</a></li>
        <li><a href="">Sign In</a></li>
        <li><a href="">Sign Up</a></li>
        <li>
          <form>
            <input type="text" placeholder="Search articles..."/>
            <button><i className="fas fa-search"></i></button>
          </form>  
        </li>
      </ul>
    </nav>
  );
}

export default Nav;