"use client"

import { useState } from "react"

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const certificates = [
    {
      id: 1,
      name: "React Developer Certification",
      issuer: "Tech Academy",
      date: "2024",
      description:
        "Comprehensive certification covering React fundamentals, hooks, state management, and modern development practices.",
      image: "/src/assets/certificate1.png",
    },
    {
      id: 2,
      name: "JavaScript Advanced Concepts",
      issuer: "Code Institute",
      date: "2023",
      description:
        "Advanced JavaScript certification covering ES6+, async programming, design patterns, and performance optimization.",
      image: "/src/assets/certificate2.png",
    },
    {
      id: 3,
      name: "Node.js Backend Development",
      issuer: "Backend Masters",
      date: "2023",
      description: "Server-side development certification with Node.js, Express, database integration, and API design.",
      image: "/src/assets/placeholder1.png",
    },
    {
      id: 4,
      name: "Database Management",
      issuer: "Data Academy",
      date: "2023",
      description: "Database design and management certification covering SQL, NoSQL, optimization, and data modeling.",
      image: "/src/assets/placeholder2.png",
    },
    {
      id: 5,
      name: "Cloud Computing Fundamentals",
      issuer: "Cloud Institute",
      date: "2022",
      description:
        "Cloud computing certification covering AWS, deployment strategies, and scalable architecture design.",
      image: "/src/assets/placeholder3.png",
    },
    {
      id: 6,
      name: "Cybersecurity Basics",
      issuer: "Security Academy",
      date: "2022",
      description:
        "Cybersecurity fundamentals certification covering network security, encryption, and best practices.",
      image: "/src/assets/sparkle.png",
    },
  ]

  const openModal = (certificate) => {
    setSelectedCertificate(certificate)
  }

  const closeModal = () => {
    setSelectedCertificate(null)
  }

  return (
    <section id="certificates" className="section">
      <div className="section-content">

        <div className="certificates-grid">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="certificate-item" onClick={() => openModal(certificate)}>
              <div className="certificate-image-container">
                <img
                  src={certificate.image || "/placeholder.svg"}
                  alt={certificate.name}
                  className="certificate-image"
                />
                <div className="certificate-overlay">
                  <h3 className="certificate-name">{certificate.name}</h3>
                  <p className="certificate-issuer">{certificate.issuer}</p>
                  <p className="certificate-date">{certificate.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCertificate && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <div className="modal-body">
                <img
                  src={selectedCertificate.image || "/placeholder.svg"}
                  alt={selectedCertificate.name}
                  className="modal-image"
                />
                <div className="modal-info">
                  <h3 className="modal-title">{selectedCertificate.name}</h3>
                  <p className="modal-issuer">Issued by: {selectedCertificate.issuer}</p>
                  <p className="modal-date">Date: {selectedCertificate.date}</p>
                  <p className="modal-description">{selectedCertificate.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Certificates
