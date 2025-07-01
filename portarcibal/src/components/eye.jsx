import React, { useState, useEffect } from 'react';
import ellipse1 from '../assets/Ellipse 1.png';
import ellipse2 from '../assets/Ellipse 2.png';
import ellipse3 from '../assets/Ellipse 3.png';
import closedEye from '../assets/shut.png';
import theCircle from '../assets/ring.png';  


const EyeComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePositions, setEyePositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showPupils, setShowPupils] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isHovered && !isClosing) {
      const eyeElement = document.querySelector('.eye-container');
      if (eyeElement) {
        const eyeRect = eyeElement.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const deltaX = mousePosition.x - eyeCenterX;
        const deltaY = mousePosition.y - eyeCenterY;
        
        const maxMovement = 30;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        let normalizedX, normalizedY;
        if (distance > maxMovement) {
          normalizedX = (deltaX / distance) * maxMovement;
          normalizedY = (deltaY / distance) * maxMovement;
        } else {
          normalizedX = deltaX * 1;
          normalizedY = deltaY * 1;
        }

        setEyePositions([
          { x: normalizedX, y: normalizedY },
          { x: normalizedX, y: normalizedY },
          { x: normalizedX, y: normalizedY },
          { x: normalizedX, y: normalizedY }
        ]);
      }
    }
  }, [mousePosition, isHovered, isClosing]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsClosing(true);
    setShowPupils(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClosing(false);
    setTimeout(() => {
      setShowPupils(true);
    }, 80); 
  };

  const handleClick = () => {
    window.location.href = '/portfolio'; 
  };

  const eyeRotations = [-45, 90, 0, 45];

  return (
    <div 
      className="eye-container"
      style={{
        position: 'absolute',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%, -15%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isHovered ? 'pointer' : 'default',
        width: '200px',
        height: '200px'
      }}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}  
      onClick={handleClick}   
    >

      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        backgroundImage: `url(${theCircle})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: 'rotate 30s linear infinite',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        width: '175px',
        height: '175px',
        backgroundImage: `url(${theCircle})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: 'rotate 20s linear infinite',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        backgroundImage: `url(${theCircle})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: 'rotate 10s linear infinite',
        zIndex: 1
      }} />

      
      {/* Four eyes layered */}
      {eyeRotations.map((rotation, index) => (
        <div 
          key={index}
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
            width: '200px',
            height: '100px',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'all 0.5s ease',
            transform: `rotate(${rotation}deg) ${isClosing ? 'scale(1.05)' : 'scale(1)'}`,
            zIndex: 10 + index
          }}
        >
          {!isClosing && showPupils && (
            <div 
              className="pupil"
              style={{
                backgroundImage: `url(${ellipse1})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '50px',
                height: '50px',
                transform: `translate(${eyePositions[index].x}px, ${eyePositions[index].y}px)`,
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
                width: '200px',
                height: '100px',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none'
              }}
            />
          )}
        </div>
      ))}

      {/* See more text */}
      <div 
        className="see-more-text"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'all 0.1s ease',
          color: '#FFFFFF',
          fontSize: '1.25rem',
          letterSpacing: '0.1rem',
          textAlign: 'center',
          lineHeight: '0.8',
          fontWeight: 'bold',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 100
        }}
      >
        see more
      </div>
    </div>
  );
};

export default EyeComponent;