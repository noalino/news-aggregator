import React from 'react';

const Nav = () => {
  return (
    <div>
      <h1>NEWS</h1>
      <a href=""><p>Home</p></a>
      <form>
        <input type="text" placeholder="Search articles..."/>
        <input type="submit"></input>
      </form>
      <a href=""><p>Sign In</p></a>
      <a href=""><p>Sign Up</p></a>
    </div>
  )
}

export default Nav;