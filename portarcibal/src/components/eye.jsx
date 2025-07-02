import React, { useState, useEffect } from 'react';
import ellipse1 from '../assets/Ellipse 1.png';
import ellipse2 from '../assets/Ellipse 2.png';
import ellipse3 from '../assets/Ellipse 3.png';
import closedEye from '../assets/shut.png';
import theCircle from '../assets/ring.png';  
import sparkle from '../assets/sparkle.png';
import shade from '../assets/ominous.png';

const Star = ({ initialX, initialY, delay, isVisible }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const generateNewPosition = () => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = 18;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      setPosition({ x, y });
      setAnimationKey(prev => prev + 1); // Force animation restart
    };

    // Wait for initial delay, then update position every 4 seconds (animation cycle)
    const timeout = setTimeout(() => {
      const interval = setInterval(generateNewPosition, 4000);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      key={animationKey} // This forces the animation to restart when position changes
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '24px',
        height: '24px',
        backgroundImage: `url(${sparkle})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        animation: isVisible ? `starPop 4s ease-in-out infinite` : 'none',
        zIndex: 16
      }}
    />
  );
};

const generateStarPositions = () => {
  const stars = [];
  const numStars = 4;
  const radius = 18;
  
  for (let i = 0; i < numStars; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    stars.push({ 
      x, 
      y, 
      delay: i * 1, // Stagger delays: 0s, 1s, 2s, 3s
      id: Math.random()
    });
  }
  
  return stars;
};

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
  const [hoveredButton, setHoveredButton] = useState('');
  const [starPositions, setStarPositions] = useState([]);

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

  useEffect(() => {
    const handleNavbarHover = (event) => {
      if (event.detail) {
        setHoveredButton(event.detail.buttonText);
        setIsClosing(true); 
        setShowPupils(false); 
      }
    };

    const handleNavbarLeave = () => {
      setHoveredButton('');
      setIsClosing(false); 
      setTimeout(() => {
        setShowPupils(true); 
      }, 100);
    };

    window.addEventListener('navbarHover', handleNavbarHover);
    window.addEventListener('navbarLeave', handleNavbarLeave);

    return () => {
      window.removeEventListener('navbarHover', handleNavbarHover);
      window.removeEventListener('navbarLeave', handleNavbarLeave);
    };
  }, []);

  useEffect(() => {
    setStarPositions(generateStarPositions());
  }, []);

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
        width: '200px',
        height: '200px'
      }} 
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
        animation: 'counterRotate 20s linear infinite',
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

      <div style={{
        position: 'absolute',
        width: '275px',
        height: '275px',
        backgroundImage: `url(${shade})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: 'counterRotate 50s linear infinite',
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
                transition: 'transform 0.05s ease-out',
                position: 'relative'
              }}
            >
              {/* Stars only on the last eye (highest z-index = topmost visually) */}
              {index === 3 && starPositions.map((star) => (
                <Star 
                  key={star.id} 
                  initialX={star.x} 
                  initialY={star.y} 
                  delay={star.delay}
                  isVisible={!isClosing && showPupils}
                />
              ))}
            </div>
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
        className="navbar-text"
        style={{
          opacity: hoveredButton ? 1 : 0,
          transition: 'opacity 0.3s ease',
          color: '#FFFFFF',
          fontSize: '1rem', // Smaller font size
          letterSpacing: '0.05rem',
          textAlign: 'center',
          fontWeight: 'bold',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 100,
          fontFamily: 'Anonymous Pro, monospace',
          maxWidth: '140px', // Limit width for text wrapping
          wordWrap: 'break-word',
          whiteSpace: 'normal'
        }}
      >
        {hoveredButton}
      </div>
    </div>
  );
};

export default EyeComponent;