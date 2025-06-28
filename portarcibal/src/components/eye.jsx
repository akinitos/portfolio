import React, { useState, useEffect } from 'react';
import ellipse1 from '../assets/Ellipse 1.png';
import ellipse2 from '../assets/Ellipse 2.png';
import ellipse3 from '../assets/Ellipse 3.png';

const EyeComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const eyeElement = document.querySelector('.eye-container');
    if (eyeElement) {
      const eyeRect = eyeElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
      
      const deltaX = mousePosition.x - eyeCenterX;
      const deltaY = mousePosition.y - eyeCenterY;
      
      const maxMovement = 30;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance > maxMovement) {
        const normalizedX = (deltaX / distance) * maxMovement;
        const normalizedY = (deltaY / distance) * maxMovement;
        setEyePosition({ x: normalizedX, y: normalizedY });
      } else {
        setEyePosition({ x: deltaX * 1, y: deltaY * 1 });
      }
    }
  }, [mousePosition]);

  return (
    <div 
      className="eye-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px' // Add some padding to make it visible
      }}
    >
      <div 
        className="eye-shape"
        style={{
          backgroundColor: 'white',
          backgroundImage: `url(${ellipse2})`, // Fixed: using backticks for template literal
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          mask: `url(${ellipse2})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          width: '160px',
          height: '80px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >

        
        <div 
          className="pupil"
          style={{
            backgroundImage: `url(${ellipse1})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '40px',
            height: '40px',
            transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
            transition: 'transform 0.05s ease-out'
          }}
        />
        
        <div 
          style={{
            backgroundImage: `url(${ellipse3})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '160px',
            height: '80px',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default EyeComponent;