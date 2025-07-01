import React, { useState, useEffect } from 'react';
import ellipse1 from '../assets/Ellipse 1.png';
import ellipse2 from '../assets/Ellipse 2.png';
import ellipse3 from '../assets/Ellipse 3.png';
import closedEye from '../assets/shut.png';

const EyeComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showPupil, setShowPupil] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isHovered && !isClosing) {
      const eyeElement = document.querySelector('.pupil');
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
    }
  }, [mousePosition, isHovered, isClosing]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsClosing(true);
    setShowPupil(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClosing(false);
    setTimeout(() => {
      setShowPupil(true);
    }, 80); 
  };

  const handleClick = () => {
    // Navigate to portfolio page
    window.location.href = '/portfolio'; 
  };

  return (
    <div 
      className="eye-container"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '-40px',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isHovered ? 'pointer' : 'default'
      }}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}  
      onClick={handleClick}   
    >

      <div 
        className="see-more-text"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'all 0.1s ease',
          color: '#6C60C7',
          WebkitTextStroke: '0.75px #FFFFFF',
          fontSize: '1.25rem',
          letterSpacing: '0.1rem',
          textAlign: 'center',
          lineHeight: '0.8',
          fontWeight: 'bold',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${isHovered ? '0' : '0px'})`,
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        see more
      </div>

      <div 
        className="eye-shape"
        style={{
          backgroundImage: isClosing ? `url(${closedEye})` : `url(${ellipse2})`,
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
          overflow: 'hidden',
          transition: 'all 0.5s ease',
          transform: isClosing ? 'scale(1.05)' : 'scale(1)'
        }}
      >
 
        {!isClosing && showPupil && (
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
        )}
        
        {!isClosing && (
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
        )}
      </div>
    </div>
  );
};

export default EyeComponent;