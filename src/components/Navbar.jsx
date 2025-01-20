import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [lastClicked, setLastClicked] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (label) => {
    setLastClicked(label);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Resume', path: '/resume' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="navbar">
      {isMobile ? (
        <>
          <img 
            src="/profile.png" 
            alt="Profile" 
            className={`profile-image ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          />
          <ul className={menuOpen ? 'active' : ''}>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.path} 
                  onClick={() => handleClick(item.label)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link 
                to={item.path} 
                onClick={() => handleClick(item.label)}
              >
                {lastClicked === item.label ? (
                  <img 
                    src="/profile.png" 
                    alt="Profile" 
                    className="profile-image"
                  />
                ) : (
                  item.label
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}