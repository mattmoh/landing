import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import BlogTOC from './pages/BlogTOC';
import GitHubRepos from './pages/GitHubRepos';
import './index.css';

const App = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/resume", element: <Resume /> },
    { path: "/blog", element: <BlogTOC /> },  
    { path: "/blog/:post_id", element: <Blog defaultPostId={1} /> },
    { path: "/portfolio", element: <GitHubRepos /> },
    { path: "*", element: <Home /> },
  ];

  return (
    <div className="app-background">
      <Router>
        <Navbar />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;