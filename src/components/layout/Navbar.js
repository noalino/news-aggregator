import React from 'react';
import { Link } from "react-router-dom";
import styles from '../../styles/layout/Navbar.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.menu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Link to="/">News</Link>
      <div className={styles.links}>
        <Link to="/log"><i className="fas fa-edit"></i><p>Sign up</p></Link>
        <Link to="/log"><i className="fas fa-sign-in-alt"></i><p>Log in</p></Link>
        {/*<i className="fas fa-sign-out-alt"></i><p>Log Out</p>*/}
        <form>
          <input type="search" name="nav-search" placeholder="Search articles..."/>
          <Link to="/search?"><button><i className="fas fa-search"></i></button></Link>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;