import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Signup from './pages/Signup';
import Blog from './pages/Blog';

const routes = [
  { path: "/", element: <Home /> },
  { path: "/resume", element: <Resume /> },
  { path: "/signup", element: <Signup /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:id", element: <Blog /> },
  { path: "*", element: <Home /> },
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

const App = () => (
  <Router>
    <Navbar />
    <AnimatedRoutes />
    <Footer />
  </Router>
);

export default App;
