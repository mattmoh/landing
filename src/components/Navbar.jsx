import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isLoggedIn = true; // Replace with actual login check

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
        <li><Link to="/blog">Blog</Link></li>
      </ul>
      <div className="spacer">
        {isLoggedIn ? (
          <Link to="/account">Profile</Link>
        ) : (
          <Link to="/account">Log In</Link>
        )}
      </div>
    </nav>
  );
}