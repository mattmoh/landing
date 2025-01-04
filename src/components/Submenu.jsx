import React from 'react';
import './Submenu.css';

export default function Submenu({ setActiveTab }) {
  return (
    <nav className="tabs">
      <ul className="submenu-list">
        <li className="submenu-item"><a onClick={() => setActiveTab('user')}>User</a></li>
        <li className="submenu-item"><a onClick={() => setActiveTab('company')}>Company</a></li>
        <li className="submenu-item"><a onClick={() => setActiveTab('avatar')}>Avatar</a></li>
      </ul>
      <button className="submenu-button" type="button" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </nav>
  );
}