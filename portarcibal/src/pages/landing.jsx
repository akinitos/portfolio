import { useEffect } from 'react'
import EyeComponent from "../components/eye.jsx"
import NavBar from "../components/navbar.jsx"
import About from "../components/about.jsx"
import Certificates from "../components/certificates.jsx"
import Projects from "../components/projects.jsx"
import Contact from "../components/contact.jsx"
import "../styles/landing.css"

function Landing() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section-content');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    if (!portfolioContainer) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.scrollTop = 0;
        }
      });
    }, {
      threshold: 0.5,
      root: portfolioContainer
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentSection = getCurrentVisibleSection();
        if (currentSection) {
          currentSection.scrollTop = 0;
        }
      }, 150); 
    };
    
    portfolioContainer.addEventListener('scroll', handleScroll);
    
    function getCurrentVisibleSection() {
      const containerRect = portfolioContainer.getBoundingClientRect();
      const sections = document.querySelectorAll('.section-content');
      
      for (let section of sections) {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top >= containerRect.top && 
            sectionRect.top < containerRect.bottom) {
          return section;
        }
      }
      return null;
    }
    
    return () => {
      observer.disconnect();
      portfolioContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="portfolio-container">
      <NavBar />

      <section id="home" className="section home-section">
        <EyeComponent />
        <div className="content">
          <h1 className="main-title">
            VON DEREK
            <br />
            V.ARCIBAL
          </h1>
        </div>
      </section>

      <About />
      <Projects />
      <Certificates />
      <Contact />
    </div>
  )
}

export default Landing
