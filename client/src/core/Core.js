import React from 'react';
import './Core.css';

function Core() {
  return (
    <div className="Core">
      <header className="Core-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard">
        <div className="widget">
          <h2>Widget 1</h2>
          <p>Content for widget 1 goes here.</p>
        </div>
        <div className="widget">
          <h2>Widget 2</h2>
          <p>Content for widget 2 goes here.</p>
        </div>
      </div>
    </div>
  );
}

export default Core;
