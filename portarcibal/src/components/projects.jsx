"use client"

import { useState } from "react"

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: "PikoSen",
      description:
        "Designed and lead the frontend development of a coffee bean distribution market, with a goal to collaborate with local beaneries.",
      image: "/src/assets/pikosen.png",
      technologies: ["Vite + React", "Django", "CSS", "Figma"],
    },
    {
      id: 2,
      name: "TrailOne",
      description:
        "Web application developed using vanilla HTML/CSS/JS. ",
      image: "/src/assets/trailone.png",
      technologies: ["HTML", "CSS", "JavaScript", "Django", "Figma"],
    },
    {
      id: 3,
      name: "Pinto",
      description:
        "My first dive towards using TKinter, specifically CustomTKinter. Sparked my interest in pursuing UI/UX and frontend development.",
      image: "/src/assets/pinto.jpg",
      technologies: ["Python", "CustomTKinter", "PhotoShop"],
    },
    {
      id: 4,
      name: "Arithmetic Logic Unit",
      description:
        "Built an Arithemtic Logic Unit as part of assembling a mini-computer for our Computer Architecture project",
      image: "/src/assets/comarch.jpg",
      technologies: ["Assembly"],
    },
    {
      id: 5,
      name: "Aristortle",
      description:
        "Sensor-based maze-solving Arduino robot car. Lovingly named it Aristortle; for its steady pace and wise pathing.",
      image: "/src/assets/aristortle.png",
      technologies: ["Arduino"],
    },
    {
      id: 6,
      name: "3-bit Up and Down Counter w/ Switch Control and Decoder Output",
      description: "Circuitry project to use a 3-bit up and down counter to display not only numbers 0 - 7, but also the word 'bacteria'.",
      image: "/src/assets/updown.png",
      technologies: ["MultiSim", "LogiSim", "Verilog"],
    },
  ]

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="section">
      <div className="section-content">

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-item" onClick={() => openModal(project)}>
              <div className="project-image-container">
                <img src={project.image || "/placeholder.svg"} alt={project.name} className="project-image" />
                <div className="project-overlay">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <div className="modal-body">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.name}
                  className="modal-image"
                />
                <div className="modal-info">
                  <h3 className="modal-title">{selectedProject.name}</h3>
                  <p className="modal-description">{selectedProject.description}</p>
                  <div className="modal-technologies">
                    <h4>Technologies Used:</h4>
                    <div className="tech-tags">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
