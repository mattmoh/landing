import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const hamburgerRef = useRef(null);
  let hideTimeout;

  const showDropdown = () => {
    setDropdownVisible(true);
    clearHideTimeout();
  };

  const hideDropdown = () => {
    hideTimeout = setTimeout(() => {
      setDropdownVisible(false);
    }, 500);
  };

  const clearHideTimeout = () => {
    clearTimeout(hideTimeout);
  };

  useEffect(() => {
    const handleMouseEnter = () => {
      clearHideTimeout();
    };

    const handleMouseLeave = () => {
      hideDropdown();
    };

    const dropdownElement = dropdownRef.current;
    const hamburgerElement = hamburgerRef.current;

    if (dropdownElement && hamburgerElement) {
      dropdownElement.addEventListener('mouseenter', handleMouseEnter);
      dropdownElement.addEventListener('mouseleave', handleMouseLeave);
      hamburgerElement.addEventListener('mouseenter', handleMouseEnter);
      hamburgerElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (dropdownElement && hamburgerElement) {
        dropdownElement.removeEventListener('mouseenter', handleMouseEnter);
        dropdownElement.removeEventListener('mouseleave', handleMouseLeave);
        hamburgerElement.removeEventListener('mouseenter', handleMouseEnter);
        hamburgerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

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
        <li><Link to="/style-guide">Style Guide</Link></li>
      </ul>
      <div 
        className="hamburger-menu-container"
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <RxHamburgerMenu 
          className="hamburger-menu" 
          ref={hamburgerRef} 
        />
        {isDropdownVisible && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <Link to="/login">Login / Sign Up</Link>
            <Link to="/app-library">App Library</Link>
          </div>
        )}
      </div>
    </nav>
  );
}