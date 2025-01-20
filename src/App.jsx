import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import BlogTOC from './pages/BlogTOC';
import GitHubRepos from './pages/GitHubRepos';
import BlogPost from './components/BlogPost';
import { fetchMaxPostId } from './components/supabaseClient';
import './index.css';

const App = () => {
  const [postId, setPostId] = useState(1);
  const [maxPostId, setMaxPostId] = useState(null);

  useEffect(() => {
    const getMaxPostId = async () => {
      const { data, error } = await fetchMaxPostId();
      if (error) {
        console.error('Error fetching max post ID:', error);
      } else {
        setMaxPostId(data[0]?.post_id || 1);
      }
    };

    getMaxPostId();
  }, []);

  const handleNavigate = (newPostId) => {
    if (newPostId > 0 && newPostId <= maxPostId) {
      setPostId(newPostId);
    }
  };

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/resume", element: <Resume /> },
    { path: "/blog", element: <BlogTOC /> },  
    { path: "/blog/:post_id", element: <BlogPost postId={postId} onNavigate={handleNavigate} maxPostId={maxPostId} /> },
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