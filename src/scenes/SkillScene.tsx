import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../css/SkillScene.css";

interface SkillsSceneProps {
    localProgress: number
}

const SkillScene = ({localProgress}: SkillsSceneProps) => {
    const timelineRef = useRef<gsap.core.Timeline | null>(null) // Ref to hold the GSAP timeline instance
    const introRef = useRef<HTMLDivElement>(null)
    const primaryRef = useRef<HTMLDivElement>(null)
    const secondaryRef = useRef<HTMLDivElement>(null)
    const closingRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        //If refs, don't exist, do nothing
        if(!introRef.current || !primaryRef.current || !secondaryRef.current || !closingRef.current) return

        // Get all skill cards for stagger animation
        const primaryCards = primaryRef.current.querySelectorAll('.skill-item')
        const secondaryCards = secondaryRef.current.querySelectorAll('.skill-item')

        // Create a paused GSAP timeline
        timelineRef.current = gsap.timeline({paused: true})

        const tl = timelineRef.current;

        // Step 1: Intro enters from right (0.0 -> 0.25)
        tl.fromTo(introRef.current, {
            opacity: 0,
            x: 200
        }, {
            opacity: 1, 
            x: 0,
            duration: 0.1,
            ease: 'Power2.out'
        }, 0) // Start at the beginning of the timeline
        tl.to(introRef.current, {
            opacity: 0,
            x: -200,
            duration: 0.1,
            ease: 'Power2.in'
        }, 0.15)

        //Step 2: Primary Skills stagger in (0.25 -> 0.5)
        tl.fromTo(primaryCards, {
            opacity: 0,
            y: 50,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.03,
            duration: 0.1,
            ease: 'back.out(1.7)'
        }, 0.25)
        tl.to(primaryCards, {
            opacity: 0,
            y: -50,
            duration: 0.08
        }, 0.42) // Start fading out at 42%, giving it a full 0.08 duration to fade out by 0.5

        // Step 3: Secondary Skills stagger in (0.5 -> 0.75)
        tl.fromTo(secondaryCards, {
            opacity: 0,
            y: 50,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.03,
            duration: 0.1,
            ease: 'back.out(1.7)'
        }, 0.5)
        tl.to(secondaryCards, {
            opacity: 0,
            y: -50,
            duration: 0.08
        }, 0.67) // Start fading out at 67%, giving it a full 0.08 duration to fade out by 0.75

        //Step 4: Closing text fade in (0.75 -> 1.0)
        tl.fromTo(closingRef.current, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2y.out'
        }, 0.75) // Start at 75% of the timeline
        tl.to(closingRef.current, {
            opacity: 0,
            y: -50,
            duration: 0.1
        }, 0.9) // Start fading out at 90%, giving it a full 0.1 duration to fade out by the end of the timeline

        return () => {
            timelineRef.current?.kill()
        }
    }, [])

    useEffect(() => {
        if (timelineRef.current) {
        timelineRef.current.progress(localProgress)
        }
    }, [localProgress])

    return (
        <section className="skills-scene skills-section">
            {/* Step 1: Intro with watermark */}
            <div ref={introRef} className="skills-step skills-intro">
                
                <h2 className="watermark" >My Skills</h2>
                
                
                <p className="skill-text" >
                    To do that consistently, I rely on a set of tools that help me turn ideas into working products.
                </p>
            </div>

            {/* Step 2: Primary Skills */}
            <div ref={primaryRef} className="skills-step">
                <div className="skills-list primary-skills" >
                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/React.png" alt="React" />
                        </div>
                        <p className="skill-description">Dynamic, state-driven interfaces and component architecture</p>
                    </div>

                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/JavaScript.png" alt="JavaScript" />
                        </div>
                        <p className="skill-description">Application logic, API integration, performance handling</p>
                    </div>

                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/HTML5.png" alt="HTML5" />
                        </div>
                        <p className="skill-description">Semantic, accessible structure</p>
                    </div>

                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/Sass.png" alt="Sass" />
                        </div>
                        <p className="skill-description">Responsive layouts, scalable styling systems</p>
                    </div>
                </div>
            </div>
            

            {/* Step 3: Secondary Skills */}
            <div ref={secondaryRef} className="skills-step">
                <div className="skills-list secondary-skills" >
                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/Figma.png" alt="Figma" />
                        </div>
                        <p className="skill-description">Designing and building user interfaces, from concept to responsive, production-ready experiences</p>
                    </div>

                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/Firebase.png" alt="Firebase" />
                        </div>
                        <p className="skill-description">Authentication, Firestore, real-time data</p>
                    </div>

                    
                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/Node.js.png" alt="Node.Js" />
                        </div>
                        <p className="skill-description">Integrating frontend with backend services, handling APIs and basic server-side logic</p>
                    </div>

                    <div className="skill-item">
                        <div className="stack-image">
                            <img src="../img/logo/Git.png" alt="Git" />
                        </div>
                        <p className="skill-description">Version control and collaboration</p>
                    </div>
                </div>
            </div>
            
            {/* Step 4: Closing ref */}
            <div ref={closingRef} className="skills-step">
                <p className="skill-text stage-text" >
                    It is not just about what is built, but understanding what needs to work, who it is for, and making sure it holds up over time.
                </p>
            </div>
            

        </section>
    )
}

export default SkillScene;