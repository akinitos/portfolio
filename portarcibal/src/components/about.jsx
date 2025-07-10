"use client"

import { useState, useEffect } from "react"

import about1 from "../assets/about1.jpg"
import about2 from "../assets/about2.jpg"
import about3 from "../assets/about3.jpg"
import about4 from "../assets/about4.jpg"
import about5 from "../assets/about5.jpg"
import about6 from "../assets/about6.jpg"

const About = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [lastInteraction, setLastInteraction] = useState(Date.now())

  const images = [
    about1,
    about2,
    about3,
    about4,
    about5,
    about6
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
            <h2>
              "Mind over matter and soul before flesh."   
              - Mos Def
            </h2>
            <p>
              Hello! I'm <b>Von Derek V. Arcibal</b>, a computer engineering student with a passion for elevating design with innovative technology. 
              I enjoy the thrill of constantly learning and exploring; to reveal beauty within machine. <br /><br />
              
              Though my interests lie in the realm of design, my skills in bringing said designs to life aren't lacking; whether it be hardware or software.
              That goes for <b>React, Vite, HTML/CSS/JS, Python, C++, Arduino, Circuitry, etc.</b> Some of which I'm more proficient in than others, but in
              all of them I am more than confident enough in my base understanding. 
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
