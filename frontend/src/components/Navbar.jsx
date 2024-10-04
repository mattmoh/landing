import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={navbarStyle}>
      <ul style={listStyle}>
        <li>
          <Link to="/">
            <img 
              src="/profile.png" 
              alt="Profile" 
              style={profileImageStyle}
            />
          </Link>
        </li>
        <li><Link to="/resume" style={linkStyle}>Resume</Link></li>
        <li><Link to="/style-guide" style={linkStyle}>Style Guide</Link></li>
      </ul>
    </nav>
  );
}

const navbarStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '10px 20px', // Added horizontal padding
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: 1000,
  borderBottom: '1px solid #ddd',
  backgroundColor: '#ffffff',
};

const body = {
  width: '100%'
}

const listStyle = {
  display: 'flex',
  alignItems: 'center',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle = {
  textDecoration: 'none',
  color: '#000',
  marginLeft: '20px',
  fontWeight: 'bold',
};

const profileImageStyle = {
  width: '75px',
  height: '75px',
  borderRadius: '50%',
};
