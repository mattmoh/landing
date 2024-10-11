import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuArrowRightToLine, LuArrowLeftToLine } from "react-icons/lu";
import '../pages/StyleGuidePage.css'; // Import the CSS file

export default function TableOfContents({ files }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isTocVisible, setIsTocVisible] = useState(true);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const toggleTocVisibility = () => {
    setIsTocVisible(!isTocVisible);
  };

  const formatText = (text) => {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className={`toc-container ${isTocVisible ? 'visible' : 'hidden'}`}>
      <div className="arrow-container" onClick={toggleTocVisibility}>
        {isTocVisible ? <LuArrowLeftToLine /> : <LuArrowRightToLine />}
      </div>
      <ul className="toc">
        {files.map((file, index) => {
          const path = `/style-guide/${file}`;
          return (
            <li key={index} className={path === activeLink ? 'active' : ''}>
              <Link to={path} onClick={() => handleClick(path)}>
                {formatText(file)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}