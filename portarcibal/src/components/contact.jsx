"use client"

import { useState } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const subject = encodeURIComponent(formData.subject || "Portfolio Contact")
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)

    window.location.href = `mailto:vonarcibal@gmail.com?subject=${subject}&body=${body}`
  }

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/yourprofile",
      icon: "📘", 
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      icon: "💼",
    },
    {
      name: "GitHub",
      url: "https://github.com/yourprofile",
      icon: "🐱",
    },
    {
      name: "Email",
      url: "mailto:vonarcibal@gmail.com",
      icon: "📧", 
    },
  ]

  return (
    <section id="contact" className="section contact-section">
      <div className="section-content">

        <div className="contact-container">
          <div className="contact-info">
            <h3>Get in touch</h3>
            <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>

            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                  <div className="social-icon-placeholder">{link.icon}</div>
                  <span className="social-name">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Send me a message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="form-textarea"
                ></textarea>
              </div>

              <button type="submit" className="form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
