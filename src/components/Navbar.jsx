import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">
            <img 
              src="/profile.png" 
              alt="Profile" 
              className="profile-image"
            />
          </Link>
        </li>
        <li><Link to="/resume">Resume</Link></li>
        <li><Link to="/signup">Newsletter</Link></li>
      </ul>
    </nav>
  );
}