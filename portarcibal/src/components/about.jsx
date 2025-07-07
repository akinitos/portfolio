"use client"

import { useState, useEffect } from "react"

const About = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [lastInteraction, setLastInteraction] = useState(Date.now())

  const images = [
    "/src/assets/Ellipse 1.png",
    "/src/assets/Ellipse 2.png",
    "/src/assets/Ellipse 3.png",
    "/src/assets/placeholder1.png",
    "/src/assets/placeholder2.png",
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
    setLastInteraction(Date.now())
    setAutoPlay(false)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    setLastInteraction(Date.now())
    setAutoPlay(false)
  }

  const goToImage = (index) => {
    setCurrentImage(index)
    setLastInteraction(Date.now())
    setAutoPlay(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteraction

      if (timeSinceLastInteraction > 3000) {
        setAutoPlay(true)
      }

      if (autoPlay) {
        setCurrentImage((prev) => (prev + 1) % images.length)
      }
    }, 4000) 

    return () => clearInterval(interval)
  }, [images.length, autoPlay, lastInteraction])

  return (
    <section id="about" className="section">
      <div className="section-content">

        <div className="about-container">
          <div className="about-text">
            <p>
              Computer Engineering student with a passion for technology and innovation. I enjoy creating solutions that
              bridge the gap between hardware and software, constantly learning and exploring new technologies to build
              meaningful projects.
            </p>
          </div>

          <div className="image-carousel">
            <div className="carousel-container">
              <div className="carousel-nav left" onClick={prevImage}></div>

              <div className="carousel-image-container">
                <img
                  src={images[currentImage] || "/placeholder.svg"}
                  alt={`About image ${currentImage + 1}`}
                  className="carousel-image"
                />
              </div>

              <div className="carousel-nav right" onClick={nextImage}></div>
            </div>

            <div className="carousel-dots">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`carousel-dot ${index === currentImage ? "active" : ""}`}
                  onClick={() => goToImage(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
