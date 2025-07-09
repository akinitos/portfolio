import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';

import ellipse1 from '../assets/Ellipse 1.png';
import ellipse2 from '../assets/Ellipse 2.png';
import ellipse3 from '../assets/Ellipse 3.png';
import closedEye from '../assets/shut.png';
import theCircle from '../assets/ring.png';
import sparkle from '../assets/sparkle.png';
import shade from '../assets/ominous.png';

import ellipse1Inverted from '../assets/Ellipse 1_inverted.png';
import ellipse2Inverted from '../assets/Ellipse 2_inverted.png';
import ellipse3Inverted from '../assets/Ellipse 3_inverted.png';
import closedEyeInverted from '../assets/shut_inverted.png';
import theCircleInverted from '../assets/ring_inverted.png';
import sparkleInverted from '../assets/sparkle_inverted.png';
import shadeInverted from '../assets/ominous_inverted.png';

const Star = ({ initialX, initialY, delay, isVisible, pupilRef, inverted }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [screenPos, setScreenPos] = useState({ left: 0, top: 0 });
  const rafRef = useRef();

  const sparkleAsset = inverted ? sparkleInverted : sparkle;

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

  if (!isVisible) return null;

  const starElement = (
    <div
      style={{
        position: 'fixed',
        left: screenPos.left,
        top: screenPos.top,
        width: '36px',
        height: '36px',
        backgroundImage: `url(${sparkleAsset})`,
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

const EyeComponent = ({ inverted = false, isCentered = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePositions, setEyePositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);
  const [isClosing, setIsClosing] = useState(false);
  const [showPupils, setShowPupils] = useState(true);
  const [hoveredButton, setHoveredButton] = useState('');
  const starPositions = useMemo(() => generateStarPositions(), []);
  const topPupilRef = useRef(null);
  const eyeContainerRef = useRef(null);

  const assets = {
    ellipse1: inverted ? ellipse1Inverted : ellipse1,
    ellipse2: inverted ? ellipse2Inverted : ellipse2,
    ellipse3: inverted ? ellipse3Inverted : ellipse3,
    closedEye: inverted ? closedEyeInverted : closedEye,
    theCircle: inverted ? theCircleInverted : theCircle,
    shade: inverted ? shadeInverted : shade,
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isClosing && eyeContainerRef.current) {
      const eyeRect = eyeContainerRef.current.getBoundingClientRect();
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
  }, [mousePosition, isClosing]);

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

  const containerStyle = isCentered ? {
    position: 'absolute',
    left: '50%',
    top: '30%',
    transform: 'translate(-50%, -15%)',
  } : {
    position: 'relative',
  };

  return (
    <div 
      ref={eyeContainerRef}
      className="eye-container"
      style={{
        ...containerStyle,
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
        backgroundImage: `url(${assets.theCircle})`,
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
        backgroundImage: `url(${assets.theCircle})`,
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
        backgroundImage: `url(${assets.theCircle})`,
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
        backgroundImage: `url(${assets.shade})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: 'counterRotate 50s linear infinite',
        zIndex: 1
      }} />
      
      {eyeRotations.map((rotation, index) => (
        <div 
          key={index}
          className="eye-shape"
          style={{
            backgroundImage: isClosing ? `url(${assets.closedEye})` : `url(${assets.ellipse2})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            mask: `url(${assets.ellipse2})`,
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
                  inverted={inverted}
                />
              ))}

              <div 
                className="pupil"
                ref={index === 3 ? topPupilRef : null}
                style={{
                  backgroundImage: `url(${assets.ellipse1})`,
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
                backgroundImage: `url(${assets.ellipse3})`,
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
      
      <div 
        className="navbar-text"
        style={{
          opacity: hoveredButton ? 1 : 0,
          transition: 'opacity 0.3s ease',
          color: inverted ? '#000000' : '#FFFFFF',
          fontSize: '1rem',
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
          maxWidth: '140px',
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