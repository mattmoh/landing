import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogTOC from './pages/BlogTOC';
import { supabase } from './components/supabaseClient';
import Account from './pages/Account';

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const routes = [
    { path: "/", element: <Blog defaultPostId={1} /> },
    { path: "/resume", element: <Blog defaultPostId={0} /> },
    { path: "/blog", element: <BlogTOC /> },  
    { path: "/blog/:post_id", element: <Blog defaultPostId={1} /> },
    { path: "/account", element: <Account session={session} /> },
    { path: "*", element: <Blog defaultPostId={1} /> },
  ];

  const AnimatedRoutes = () => {
    const location = useLocation();

    return (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    );
  };

  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}

export default App;