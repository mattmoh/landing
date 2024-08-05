import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <a href="/"><img src='./profile.png' alt="logo"/></a>
        <li><a href="/resume">Resume</a></li>
        <li><a href="/wd-gen">WD Generate</a></li>
        {/*<li><a href="/login">Log In</a></li>
        <li><a href="/logout">Log Out</a></li>*/}
      </ul>
    </nav>
  );
}

export default Navbar;
