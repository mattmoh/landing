import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <ul style={listStyle}>
          <li><a href="https://www.linkedin.com/in/matt-mohrenweiser" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <FaLinkedin size={24} style={iconStyle} /> LinkedIn </a></li>
          <li><a href="https://github.com/mattmoh" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <FaGithub size={24} style={iconStyle} /> GitHub </a></li>
          <li><a href="mailto:me@mattmoh.com" style={linkStyle}>
            <FaEnvelope size={24} style={iconStyle} /> Email </a></li>
        </ul>
      </div>
    </footer>
  );
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  zIndex: 1000,
  backgroundColor: '#ffffff',
};

const containerStyle = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
};

const listStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  listStyleType: 'none',
  padding: 0,
  margin: 0
};

const linkStyle = {
  textDecoration: 'none',
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  margin: '0 15px'
};

const iconStyle = {
  marginRight: '8px'
};

export default Footer;
