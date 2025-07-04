import React, { useState, useEffect, useRef, useMemo } from 'react';
import ellipse1 from '../assets/Ellipse 1.png';
import ellipse2 from '../assets/Ellipse 2.png';
import ellipse3 from '../assets/Ellipse 3.png';
import closedEye from '../assets/shut.png';
import theCircle from '../assets/ring.png';  
import sparkle from '../assets/sparkle.png';
import shade from '../assets/ominous.png';
import ReactDOM from 'react-dom';

const Star = ({ initialX, initialY, delay, isVisible, pupilRef }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [screenPos, setScreenPos] = useState({ left: 0, top: 0 });
  const rafRef = useRef();

  // Move star to new internal offset every few seconds
  useEffect(() => {
    const updateInternalPosition = () => {
      const minRadius = 20; 
      const maxRadius = 25;
      const angle = Math.random() * 2 * Math.PI;
      const r = minRadius + Math.random() * (maxRadius - minRadius);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      setPosition({ x, y });
    };

    const timeout = setTimeout(() => {
      const interval = setInterval(updateInternalPosition, 4000);
      return () => clearInterval(interval);
    }, delay * 1000 + 4000);

    return () => clearTimeout(timeout);
  }, [delay]);

  // Optimized pupil tracking - only update when position changes or when pupil moves
  useEffect(() => {
    const updateScreenPosition = () => {
      if (pupilRef.current) {
        const rect = pupilRef.current.getBoundingClientRect();
        setScreenPos({
          left: rect.left + rect.width / 2 + position.x,
          top: rect.top + rect.height / 2 + position.y
        });
      }
    };

    const startTracking = () => {
      updateScreenPosition();
      rafRef.current = requestAnimationFrame(startTracking);
    };

    if (isVisible) {
      startTracking();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [position, isVisible, pupilRef]);

  // Don't render if not visible
  if (!isVisible) return null;

  const starElement = (
    <div
      style={{
        position: 'fixed',
        left: screenPos.left,
        top: screenPos.top,
        width: '36px',
        height: '36px',
        backgroundImage: `url(${sparkle})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transform: 'translate(-50%, -50%)',
        animation: 'starPop 4s ease-in-out infinite',
        zIndex: 9000,
        pointerEvents: 'none'
      }}
    />
  );

  return ReactDOM.createPortal(starElement, document.body);
};

const generateStarPositions = () => {
  const stars = [];
  const numStars = 1;

  for (let i = 0; i < numStars; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const r = Math.random() * 20;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;

    stars.push({
      x,
      y,
      delay: i * 0.5,
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
  const starPositions = useMemo(() => generateStarPositions(), []);
  const topPupilRef = useRef(null);

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
        width: '255px',
        height: '255px',
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
            <>
              {index === 3 && starPositions.map((star) => (
                <Star 
                  key={star.id}
                  initialX={star.x}
                  initialY={star.y}
                  delay={star.delay}
                  isVisible={true}
                  pupilRef={topPupilRef}
                />
              ))}

              <div 
                className="pupil"
                ref={index === 3 ? topPupilRef : null}
                style={{
                  backgroundImage: `url(${ellipse1})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  width: '50px',
                  height: '50px',
                  transform: `translate(${eyePositions[index].x}px, ${eyePositions[index].y}px)`,
                  transition: 'transform 0.05s ease-out',
                  position: 'relative',
                }}
              />
            </>
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