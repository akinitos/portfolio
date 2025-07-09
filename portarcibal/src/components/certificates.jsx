"use client"

import { useState } from "react"

// Import your images so Vite picks them up
import ccna1 from "../assets/CCNA1.png"
import ccna2 from "../assets/CCNA2.png"

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const certificates = [
    {
      id: 1,
      name: "CCNAv7: Introduction to Networks",
      issuer: "CISCO Networking Academy",
      date: "2024",
      description: (
        <>
          The student was able to proficiently:<br />
          - Configure switches and end devices to provide access to local and remote network resources. <br />
          - Explain how physical and data link layer protocols support the operation of Ethernet in a switched network. <br />
          - Configure routers to enable end-to-end connectivity between remote devices. <br />
          - Create IPv4 and IPv6 addressing schemes and verify network connectivity between devices. <br />
          - Explain how the upper layers of the OSI model support network applications. <br />
          - Configure a small network with security best practices. <br />
          - Troubleshoot connectivity in a small network. <br />
        </>
      ),
      image: ccna1,
    },
    {
      id: 2,
      name: "CCNAv7: Switching, Routing, and Wireless Essentials",
      issuer: "CISCO Networking Academy",
      date: "2024",
      description: (
        <>
          The student was able to proficiently:<br />
          - Configure VLANs and Inter-VLAN routing applying security best practices. <br />
          - Troubleshoot inter-VLAN routing on Layer 3 devices. <br />
          - Configure redundancy on a switched network using STP and EtherChannel. <br />
          - Explain how to support available and reliable networks using dynamic addressing and first-hop redundancy protocols. <br />
          - Configure dynamic address allocation in IPv6 networks. <br />
          - Configure WLANs using a WLC and L2 security best practices. <br />
          - Configure switch security to mitigate LAN attacks. <br />
          - Configure IPv4 and IPv6 static routing on routers. <br />
        </>
      ),
      image: ccna2,
    }
  ]

  const openModal  = (cert) => setSelectedCertificate(cert)
  const closeModal = () => setSelectedCertificate(null)

  return (
    <section id="certificates" className="section">
      <div className="section-content">

        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="certificate-item"
              onClick={() => openModal(cert)}
            >
              <div className="certificate-image-container">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="certificate-image"
                />
                <div className="certificate-overlay">
                  <h3 className="certificate-name">{cert.name}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  <p className="certificate-date">{cert.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCertificate && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              <div className="modal-body">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  className="modal-image"
                />
                <div className="modal-info">
                  <h3 className="modal-title">{selectedCertificate.name}</h3>
                  <p className="modal-issuer">
                    Issued by: {selectedCertificate.issuer}
                  </p>
                  <p className="modal-date">
                    Date: {selectedCertificate.date}
                  </p>
                  <p className="modal-description">
                    {selectedCertificate.description}
                  </p>
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