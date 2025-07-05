import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState('vdva.');
  const [isOnContact, setIsOnContact] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState('home');

  // helper to fire eye-component events
  const dispatchNavbarHover = (text) => {
    window.dispatchEvent(
      new CustomEvent('navbarHover', { detail: { buttonText: text } })
    );
  };
  const dispatchNavbarLeave = () => {
    window.dispatchEvent(new CustomEvent('navbarLeave'));
  };

  // scroll detection
  useEffect(() => {
    const container = document.querySelector('.portfolio-container');
    if (!container) return;
    const handleScroll = () => setIsScrolled(container.scrollTop > 50);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // intersection observer: active section, contact/dark-scrollbar toggle
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const container = document.querySelector('.portfolio-container');
    if (!container) return;

    const options = {
      root: container,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const secId = entry.target.id;
          const newText = secId === 'home' ? 'vdva.' : `${secId}.`;
          setActiveSection(newText);
          setIsOnContact(secId === 'contact');
          setCurrentSectionId(secId);

          // invert scrollbar colors on contact
          if (secId === 'contact') {
            container.classList.add('dark-scrollbar');
          } else {
            container.classList.remove('dark-scrollbar');
          }
        }
      });
    }, options);

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const handleNavClick = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isExpanded = !isScrolled || isHovering;
  const colors = {
    background: isOnContact ? 'black' : 'white',
    border: isOnContact ? 'white' : 'black',
    text: isOnContact ? 'white' : 'black',
    middleButtonBg: isOnContact ? 'white' : 'black',
    middleButtonText: isOnContact ? 'black' : 'white',
    shadow: isOnContact ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
  };

  const navStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isExpanded ? '80%' : 'fit-content',
    maxWidth: '1200px',
    height: '60px',
    backgroundColor: colors.background,
    border: `2px solid ${colors.border}`,
    boxShadow: `8px 8px 0px ${colors.shadow}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isExpanded ? 'space-between' : 'center',
    padding: isExpanded ? '0 20px' : '0 10px',
    zIndex: 9999,
    fontFamily: "'Anonymous Pro', monospace",
    transition:
      'width 0.4s ease, padding 0.2s ease, background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.3s ease, gap 0.2s ease',
  };

  const baseButtonStyle = {
    backgroundColor: 'transparent',
    color: colors.text,
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    transition: 'color 0.3s ease',
  };

  const getSideButtonStyle = (sectionId) => ({
    ...baseButtonStyle,
    visibility: isExpanded ? 'visible' : 'hidden',
    opacity: isExpanded ? 1 : 0,
    width: isExpanded ? 'auto' : 0,
    padding: isExpanded ? '0 15px' : 0,
    transition: isExpanded
      ? 'opacity 0.3s ease, width 0.4s ease, padding 0s ease'
      : 'opacity 0s, width 0.2s, padding 0.2s',
  });

  const middleButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: colors.middleButtonBg,
    color: colors.middleButtonText,
    padding: '10px 20px',
    fontSize: '1.5rem',
    margin: isExpanded ? '0 10px' : '0',
    transition:
      'margin 0.4s ease, background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
  };

  return (
    <nav
      style={navStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        className={`nav-button ${currentSectionId === 'about' ? 'active' : ''}`}
        onClick={() => handleNavClick('about')}
        style={getSideButtonStyle('about')}
        onMouseEnter={() => dispatchNavbarHover('see what im about.')}
        onMouseLeave={() => dispatchNavbarLeave()}
      >
        <span>about.</span>
      </button>

      <button
        className={`nav-button ${currentSectionId === 'projects' ? 'active' : ''}`}
        onClick={() => handleNavClick('projects')}
        style={getSideButtonStyle('projects')}
        onMouseEnter={() => dispatchNavbarHover('see what i do.')}
        onMouseLeave={() => dispatchNavbarLeave()}
      >
        <span>projects.</span>
      </button>

      <button
        className="middle-button"
        onClick={() => handleNavClick('home')}
        style={middleButtonStyle}
        onMouseEnter={() => dispatchNavbarHover('home.')}
        onMouseLeave={() => dispatchNavbarLeave()}
      >
        {isExpanded ? 'vdva.' : activeSection}
      </button>

      <button
        className={`nav-button ${currentSectionId === 'certificates' ? 'active' : ''}`}
        onClick={() => handleNavClick('certificates')}
        style={getSideButtonStyle('certificates')}
        onMouseEnter={() => dispatchNavbarHover('see what i earned.')}
        onMouseLeave={() => dispatchNavbarLeave()}
      >
        <span>certificates.</span>
      </button>

      <button
        className={`nav-button ${currentSectionId === 'contact' ? 'active' : ''}`}
        onClick={() => handleNavClick('contact')}
        style={getSideButtonStyle('contact')}
        onMouseEnter={() => dispatchNavbarHover('see more of me.')}
        onMouseLeave={() => dispatchNavbarLeave()}
      >
        <span>contact.</span>
      </button>
    </nav>
  );
};

export default NavBar;