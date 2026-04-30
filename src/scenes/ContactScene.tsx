import '../css/ContactScene.css'

const ContactScene = () => {
  // Placeholder contact methods
  const contactMethods = [
    { label: 'Email', value: 'hello@example.com', icon: '✉️' },
    { label: 'Whatsapp', value: 'https://wa.me/2349131592425', icon: '✉️' },
    { label: 'Phone Number', value: '+2349131592425', icon: '✉️' },
    
  ]

  return (
    <div className="contact-scene">
      {/* Step 1: Intro text */}
      <div className="contact-step contact-intro">
        <p>If you are working on something and need it to be clear, reliable, and built to last, let us talk.</p>
      </div>
      
      {/* Step 2: Contact info boxes */}
      <div className="contact-step contact-info">
        <div className="contact-grid">
          {contactMethods.map((method, index) => (
            <div key={index} className="contact-card">
              <span className="contact-icon">{method.icon}</span>
              <h3>{method.label}</h3>
              <p>{method.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Step 3: Image (optional) */}
      <div className="contact-step contact-image">
        <div className="contact-image-placeholder">
          <span>Contact Image</span>
        </div>
      </div>
    </div>
  )
}

export default ContactScene