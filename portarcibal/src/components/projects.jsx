"use client"

import { useState } from "react"

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      name: "Project One",
      description:
        "A comprehensive web application built with React and Node.js. Features include user authentication, real-time data updates, and responsive design.",
      image: "/src/assets/placeholder1.png",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      name: "Project Two",
      description:
        "Mobile application developed using React Native. Includes GPS tracking, push notifications, and offline functionality.",
      image: "/src/assets/placeholder2.png",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      id: 3,
      name: "Project Three",
      description:
        "IoT project combining hardware and software. Arduino-based sensor system with web dashboard for monitoring.",
      image: "/src/assets/placeholder3.png",
      technologies: ["Arduino", "Python", "Flask"],
    },
    {
      id: 4,
      name: "Project Four",
      description:
        "Machine learning project for image classification. Trained custom CNN model with high accuracy results.",
      image: "/src/assets/ominous.png",
      technologies: ["Python", "TensorFlow", "OpenCV"],
    },
    {
      id: 5,
      name: "Project Five",
      description:
        "E-commerce platform with payment integration. Full-stack application with admin panel and user management.",
      image: "/src/assets/ring.png",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
    },
    {
      id: 6,
      name: "Project Six",
      description: "Game development project using Unity. 2D platformer with custom physics and level editor.",
      image: "/src/assets/shut.png",
      technologies: ["Unity", "C#", "Photoshop"],
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
