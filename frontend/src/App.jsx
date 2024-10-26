// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import StyleGuidePage from './pages/StyleGuidePage';
import AppLibrary from './pages/AppLibrary';

export default function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/style-guide" element={<StyleGuidePage />} />
          <Route path="/style-guide/:fileName" element={<StyleGuidePage />} />
          <Route path="/app-library" element={<AppLibrary />} />
        </Routes>
        <Footer />
    </Router>
  );
}
