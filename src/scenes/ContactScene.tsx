import '../css/ContactScene.css'

import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { HiEnvelope } from "react-icons/hi2";
import { HiPhoneArrowDownLeft } from "react-icons/hi2";
import { HiMiniArrowUpRight } from "react-icons/hi2";


const ContactScene = () => {
  // Placeholder contact methods
  const contactMethods = [
    { label: 'Email', value: 'hello@example.com', link: 'mailto:hello@example.com', icon: HiEnvelope },
    { label: 'Whatsapp', value: '+2349131592425', link: 'https://wa.me/2349131592425', icon: HiChatBubbleOvalLeftEllipsis },
    { label: 'Phone Number', value: '+2349131592425', link: 'tel:+2349131592425', icon: HiPhoneArrowDownLeft },
    
  ]

  return (
    <div className="contact-scene">
      {/* Step 1: Intro text */}
      <div className="contact-step contact-intro">
        <h2 className="watermark">Contact Me</h2>
        <p>If you are working on something and need it to be clear, reliable, and built to last, let us talk.</p>
      </div>
      
      {/* Step 2: Contact info boxes */}
      <div className="contact-step contact-info">
        <div className="contact-container">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="contact-card">
                <a className= "contact-card-link" href={method.link} target="_blank" rel="noopener noreferrer">
                  <span className="contact-icon"><Icon /></span>
                  <div className="contact-card-right">
                    <div className="contact-detail">
                      <h3>{method.label}</h3>
                      <p>{method.value}</p>
                    </div>
                    
                    <div className="link-arrow">
                      <HiMiniArrowUpRight />
                    </div>
                  </div>
                </a>
              </div>
            )   
          })}
        </div>
      </div>
      
      {/* Step 3: Image (optional) */}
    </div>
  )
}

export default ContactScene