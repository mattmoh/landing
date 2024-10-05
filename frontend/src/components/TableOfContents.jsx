import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TableOfContents({ files }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="toc">
      <ul>
        {files.map((file, index) => {
          const path = `/style-guide/${file}`;
          return (
            <li key={index} className={path === activeLink ? 'active' : ''}>
              <Link to={path} onClick={() => handleClick(path)}>
                {file}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}