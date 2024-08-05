import { useState, useEffect } from 'react';
import '../App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function NoPage() {
  return (
    <div class="fourOfour">
      <h1>Ugh... page not found</h1>
      <img src="404.png"></img>
    </div>
  );
}

export default NoPage;
