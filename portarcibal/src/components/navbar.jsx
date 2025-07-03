import React, { useState } from 'react';

const NavBar = () => {
  const [hoveredButton, setHoveredButton] = useState('');

  const handleMouseEnter = (buttonName, eyeText) => {
    setHoveredButton(buttonName);
    window.dispatchEvent(new CustomEvent('navbarHover', { 
      detail: { buttonText: eyeText } 
    }));
  };

  const handleMouseLeave = () => {
    setHoveredButton('');
    window.dispatchEvent(new CustomEvent('navbarLeave'));
  };

  const buttonStyle = (buttonName) => ({
    backgroundColor: hoveredButton === buttonName ? 'black' : 'transparent',
    color: hoveredButton === buttonName ? 'white' : 'black',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Anonymous Pro, monospace',
    transition: 'all 0.3s ease',
    padding: '8px 12px',
    borderRadius: '4px'
  });

  const homeButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Anonymous Pro, monospace'
  };

  return (
    <nav style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      maxWidth: '1200px',
      height: '60px',
      backgroundColor: 'white',
      border: '2px solid black',
      boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      zIndex: 1000,
      fontFamily: 'Anonymous Pro, monospace'
    }}>
      <button 
        onClick={() => window.location.href = '/about'}
        onMouseEnter={() => handleMouseEnter('about', 'see more of me.')}
        onMouseLeave={handleMouseLeave}
        style={buttonStyle('about')}
      >
        about.
      </button>

      <button 
        onClick={() => window.location.href = '/certificates'}
        onMouseEnter={() => handleMouseEnter('certificates', 'see what i earned.')}
        onMouseLeave={handleMouseLeave}
        style={buttonStyle('certificates')}
      >
        certificates.
      </button>

      <button 
        onClick={() => window.location.href = '/'}
        onMouseEnter={() => handleMouseEnter('home', 'home.')}
        onMouseLeave={handleMouseLeave}
        style={homeButtonStyle}
      >
        vdva.
      </button>

      <button 
        onClick={() => window.location.href = '/projects'}
        onMouseEnter={() => handleMouseEnter('projects', 'see what i do.')}
        onMouseLeave={handleMouseLeave}
        style={buttonStyle('projects')}
      >
        projects.
      </button>

      <button 
        onClick={() => window.location.href = '/contact'}
        onMouseEnter={() => handleMouseEnter('contact', 'lets connect.')}
        onMouseLeave={handleMouseLeave}
        style={buttonStyle('contact')}
      >
        contact.
      </button>
    </nav>
  );
};

export default NavBar;