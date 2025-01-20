import React, { useEffect, useState } from 'react';
import { MdOpenInNew } from "react-icons/md";
import './GitHubRepos.css';

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/mattmoh/repos');
        const data = await response.json();
        const filteredData = data.filter(repo => repo.name !== 'mattmoh');
        setRepos(filteredData);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      }
    };

    fetchRepos();
  }, []);

  const toTitleCase = (str) => {
    return str.replace(/-/g, ' ').replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <main>
      <h1>Portfolio</h1>
      <div className="repo-cards">
        {repos.map(repo => (
          <div key={repo.id} className="repo-card">
            <h2>{toTitleCase(repo.name)}</h2>
            <p>{repo.description}</p>
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
            ><button>
              <span>Check it out!</span> <MdOpenInNew />
            </button></a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GitHubRepos;
