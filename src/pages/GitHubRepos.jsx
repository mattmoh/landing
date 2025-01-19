import React, { useEffect, useState } from 'react';
import './GitHubRepos.css'; // Import the CSS file for styling

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

  return (
    <main>
      <h1>Check out some of my work!</h1>
      <div className="repo-cards">
        {repos.map(repo => (
          <a 
            key={repo.id} 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="repo-card"
          >
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
};

export default GitHubRepos;
