import React from 'react';
import './AppLibrary.css';

const appData = {
  App1: {
    name: "Prism Generator",
    image: "nice.png",
    description: "This app generates fake Prism data, loads it into your tenant & optionally kicks off an Accounting Center batch."
  },
  App2: {
    name: "Report Inventory",
    image: "report.png",
    description: "Here is a list of custom reports that can be deployed to your tenant."
  },
  App3: {
    name: "Integration Inventory",
    image: "laptop.png",
    description: "Here is a list of Studio integrations that can be deployed to your tenant."
  }
};

const AppLibrary = () => {
  return (
    <main>
      <div className='intro'>
        <p>You must log in to access...</p>
      </div>
      <div className='app-library'>
        {Object.keys(appData).map(key => (
          <div className='card' key={key}>
            <h2>{appData[key].name}</h2>
            <img src={`./${appData[key].image}`} alt={appData[key].name} />
            <p>{appData[key].description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AppLibrary;
