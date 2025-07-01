import React from 'react';
import EyeComponent from '../components/eye.jsx';
import NavBar from '../components/navbar.jsx';
import '../styles/landing.css';

function Landing() {
  return (
    <div className="portfolio-container">
      <NavBar />
      <EyeComponent />
      <div className="content">
        <h1 className="main-title">
          VON DEREK<br />
          V.ARCIBAL
        </h1>
      </div>
    </div>
  );
}

export default Landing;