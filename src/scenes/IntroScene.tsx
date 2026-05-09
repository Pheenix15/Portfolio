import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../css/IntroScene.css"

// Define what IntroScene should look like: "It must have a property called localProgress and it must be a number"
interface IntroSceneProps {
    localProgress: number;
}

const IntroScene = ({localProgress} : IntroSceneProps) => {
    const timelineRef = useRef<gsap.core.Timeline | null>(null); // Store GSAP timeline instance - persists across renders without triggering re-renders
    const containerRef = useRef<HTMLDivElement>(null); //Ref to DOM element for GSAP animations

    useEffect(() => {
        // If container doesn't exist yet, do nothing
        if (!containerRef.current) return;

        // Create a paused GSAP timeline (controlled manually)
        timelineRef.current = gsap.timeline({ paused: true});

        const tl = timelineRef.current;
        //Scene fade-out with slight scale down
        tl.fromTo(containerRef.current, {
            opacity: 1,
            scale: 1,
        }, {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: "power2.inOut"
        }, 0) // Start at the very beginning of the timeline

        // Cleanup timeline on unmount to prevent memory leaks
        return () => {
            timelineRef.current?.kill()
        }
    }, []);

    // Update the timeline's progress whenever localProgress changes
    useEffect(() => {
        if (timelineRef.current) {
            timelineRef.current.progress(localProgress)
        }
    }, [localProgress]);


    return (
        <section ref={containerRef} className="hero-scene hero" >
            <div className="hero-text">
                <p className="hello">Hello 👋</p>
                <h1 className="name">I'm Francis Odimmegwa</h1>
                <p className="title">Front-end Engineer</p>
                <div className="hero-buttons">
                    <button className="button hero-contact">Contact Me</button>
                    <button className="alt-button hero-portfolio">View my works</button>
                </div>
            </div>

            <div className="hero-image">
                <img src="./img/me.png" alt="Francis" />
            </div>
        </section>
    );
}

export default IntroScene;