import React from 'react';

const NavBar = () => {
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
        onMouseEnter={() => {
          window.dispatchEvent(new CustomEvent('navbarHover', { 
            detail: { buttonText: 'about.' } 
          }));
        }}
        onMouseLeave={() => {
          window.dispatchEvent(new CustomEvent('navbarLeave'));
        }}
        style={{
          backgroundColor: 'transparent',
          color: 'black',
          border: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'Anonymous Pro, monospace'
        }}
      >
        about.
      </button>

      <button 
        onClick={() => window.location.href = '/certificates'}
        onMouseEnter={() => {
          window.dispatchEvent(new CustomEvent('navbarHover', { 
            detail: { buttonText: 'certificates.' } 
          }));
        }}
        onMouseLeave={() => {
          window.dispatchEvent(new CustomEvent('navbarLeave'));
        }}
        style={{
          backgroundColor: 'transparent',
          color: 'black',
          border: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'Anonymous Pro, monospace'
        }}
      >
        certificates.
      </button>

      <button 
        onClick={() => window.location.href = '/'}
        onMouseEnter={() => {
          window.dispatchEvent(new CustomEvent('navbarHover', { 
            detail: { buttonText: 'vdva.' } 
          }));
        }}
        onMouseLeave={() => {
          window.dispatchEvent(new CustomEvent('navbarLeave'));
        }}
        style={{
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'Anonymous Pro, monospace'
        }}
      >
        vdva.
      </button>

      <button 
        onClick={() => window.location.href = '/projects'}
        onMouseEnter={() => {
          window.dispatchEvent(new CustomEvent('navbarHover', { 
            detail: { buttonText: 'projects.' } 
          }));
        }}
        onMouseLeave={() => {
          window.dispatchEvent(new CustomEvent('navbarLeave'));
        }}
        style={{
          backgroundColor: 'transparent',
          color: 'black',
          border: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'Anonymous Pro, monospace'
        }}
      >
        projects.
      </button>

      <button 
        onClick={() => window.location.href = '/contact'}
        onMouseEnter={() => {
          window.dispatchEvent(new CustomEvent('navbarHover', { 
            detail: { buttonText: 'contact.' } 
          }));
        }}
        onMouseLeave={() => {
          window.dispatchEvent(new CustomEvent('navbarLeave'));
        }}
        style={{
          backgroundColor: 'transparent',
          color: 'black',
          border: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'Anonymous Pro, monospace'
        }}
      >
        contact.
      </button>
    </nav>
  );
};

export default NavBar;