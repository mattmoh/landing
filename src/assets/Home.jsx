import { useState, useEffect } from 'react';
import '../App.css';
import Navbar from './Navbar';
import ReactMarkdown from 'react-markdown';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Home() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/mattmoh.md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
      .catch((error) => {
        console.error("Error fetching the markdown file:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="about">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>

  );
}

export default Home;
