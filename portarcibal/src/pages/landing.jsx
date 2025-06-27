import React from 'react';
import EyeComponent from '../components/eye.jsx';
import '../styles/landing.css';

function Landing() {
  return (
    <div className="portfolio-container">
      <div className="content">
        <h1 className="main-title">
          VON DEREK<br />
          V.ARCIBAL
        </h1>
        <div className="squiggly-text">
          have a look at my portfolio
        </div>
        <p className="subtitle">
          have a look at my portfolio
        </p>
      </div>
      <EyeComponent />
    </div>
  );
}

export default Landing;