import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/ContactScene.css'

import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { HiEnvelope } from "react-icons/hi2";
import { HiPhoneArrowDownLeft } from "react-icons/hi2";
import { HiMiniArrowUpRight } from "react-icons/hi2";

interface ContactSceneProps {
  localProgress: number
}


const ContactScene = ({ localProgress }: ContactSceneProps) => {
  //Store GSAP timeline
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  //Reference to each step's DOM element
  const introRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  // Placeholder contact methods
  const contactMethods = [
    { label: 'Email', value: 'hello@example.com', link: 'mailto:hello@example.com', icon: HiEnvelope },
    { label: 'Whatsapp', value: '+2349131592425', link: 'https://wa.me/2349131592425', icon: HiChatBubbleOvalLeftEllipsis },
    { label: 'Phone Number', value: '+2349131592425', link: 'tel:+2349131592425', icon: HiPhoneArrowDownLeft },
    
  ]


  useEffect(() => {
    // If any ref doesn't exist yet, wait
    if (!introRef.current || !infoRef.current) return

    // Get all contact cards for stagger animation
    const cards = infoRef.current.querySelectorAll('.contact-card')

    // Create paused timeline
    timelineRef.current = gsap.timeline({ paused: true })

    const tl = timelineRef.current

    // Step 1: Intro text (0.0 → 0.4)
    tl.fromTo(introRef.current, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.out'
    }, 0)
    tl.to(introRef.current, {
      opacity: 0,
      duration: 0.3
    }, 0.2)

    // Step 2: Contact cards (0.4 → 0.8)
    tl.fromTo(cards, {
      opacity: 0,
      scale: 0.8
    }, {
      opacity: 1,
      scale: 1,
      stagger: 0.05,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, 0.5)
    // tl.to(cards, {
    //   opacity: 0,
    //   duration: 0.1
    // }, 0.7)

    return () => {
      // Cleanup on unmount
      timelineRef.current?.kill()
    }
  }, [])

  useEffect(() => {
    // Drive timeline with localProgress
    if (timelineRef.current) {
      timelineRef.current.progress(localProgress)
    }
  }, [localProgress])

  return (
    <div className="contact-scene">
      {/* Step 1: Intro text */}
      <div ref={introRef} className="contact-step contact-intro">
        <h2 className="watermark">Contact Me</h2>
        <p>If you are working on something and need it to be clear, reliable, and built to last, let us talk.</p>
      </div>
      
      {/* Step 2: Contact info boxes */}
      <div ref={infoRef} className="contact-step contact-info">
        <div className="contact-container">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="contact-card">
                <a className= "contact-card-link" href={method.link} rel="noopener noreferrer">
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