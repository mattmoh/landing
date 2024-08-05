import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from './assets/Navbar';
import Home from "./assets/Home";
import Resume from "./assets/Resume";
import WDGen from "./assets/WDGen";
import Login from "./assets/Login";
import NoPage from "./assets/NoPage";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="resume" element={<Resume />} />
          <Route path="wd-gen" element={<WDGen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
