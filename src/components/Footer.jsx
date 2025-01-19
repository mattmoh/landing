import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/matt-mohrenweiser" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="icon" />LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/mattmoh" target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} className="icon" />GitHub
            </a>
          </li>
          <li>
            <a href="mailto:me@mattmoh.com">
              <FaEnvelope size={24} className="icon" />Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;