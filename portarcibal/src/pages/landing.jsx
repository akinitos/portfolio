import EyeComponent from "../components/eye.jsx"
import NavBar from "../components/navbar.jsx"
import About from "../components/about.jsx"
import Certificates from "../components/certificates.jsx"
import Projects from "../components/projects.jsx"
import Contact from "../components/contact.jsx"
import "../styles/landing.css"

function Landing() {
  return (
    <div className="portfolio-container">
      <NavBar />

      {/* Home Section - Original Landing Page Design */}
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

      {/* Additional Sections */}
      <About />
      <Projects />
      <Certificates />
      <Contact />
    </div>
  )
}

export default Landing
