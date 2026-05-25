import { useState } from "react";
import { PiEqualsBold } from "react-icons/pi";
import { PiXBold } from "react-icons/pi";
import { SCENE_RANGES, type SceneName } from '../core/sceneConfig'
import '../css/Nav.css'

function Nav() {
    const [isOpen, setIsOpen] = useState(false)

    // Navigate to a specific scene by setting scroll position
    const navigateToScene = (sceneName: SceneName) => {
        // Get the scene's start position (0 to 1)
        const sceneStart = SCENE_RANGES[sceneName].start
        
        // Calculate total scrollable height
        const scrollHeight = document.documentElement.scrollHeight
        const viewportHeight = window.innerHeight
        const maxScroll = scrollHeight - viewportHeight
        
        // Convert scene start percentage to actual scroll position
        const targetScroll = sceneStart * maxScroll

        // Offset so section starts inside the scene not on boundary
        // 0.001 = approx 14vh of buffer
        const offset = maxScroll * 0.002
        
        // Scroll to position with smooth animation
        window.scrollTo({
        top: targetScroll + offset,
        behavior: 'smooth' // Browser animates the scroll
        })
    }

    return (
        <nav className="nav">
            <button 
                className={`menu-button ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle menu"
            >
                <PiEqualsBold className="icon bar" />
                <PiXBold className="icon x" />
            </button>

            {isOpen && (
                <div className="menu"> 
                    <ul className="section-list">
                        <li onClick={() => {navigateToScene('intro'); setIsOpen(false)}} >Intro</li>
                        <li onClick={() => {navigateToScene('about'); setIsOpen(false)}} >About</li>
                        <li onClick={() => {navigateToScene('skills'); setIsOpen(false)}} >Skills</li>
                        <li onClick={() => {navigateToScene('projects'); setIsOpen(false)}} >Projects</li>
                        <li onClick={() => {navigateToScene('contact'); setIsOpen(false)}} >Contact Info</li>
                    </ul>
                </div>
            )}
            
        </nav>
    );
}

export default Nav;