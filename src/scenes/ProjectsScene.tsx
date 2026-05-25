import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {projects} from '../arrays/projectArray';
import "../css/ProjectsScene.css"

interface ProjectSceneProps {
    localProgress: number;
}

const ProjectsScene = ({localProgress}: ProjectSceneProps) => {
    // Store GSAP timeline instance
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Reference to each step in DOM
    const introRef = useRef<HTMLDivElement>(null);
    const project1Ref = useRef<HTMLDivElement>(null);
    const project2Ref = useRef<HTMLDivElement>(null);
    const project3Ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        //If refs don't exist yet, do nothing
        if(!introRef.current || !project1Ref.current || !project2Ref.current || !project3Ref.current) return;

        // Create GSAP paused timeline
        timelineRef.current = gsap.timeline({ paused: true });

        const tl = timelineRef.current;

        //Step 1: Intro text (0.0 -> 0.1)
        tl.fromTo(introRef.current, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            ease: 'power2.out'
        }, 0) // Start at the beginning
        tl.to(introRef.current, {
            opacity: 0,
            duration: 0.05
        }, 0.05)

        //Step 2: Projects 

        //Project 1 (0.1 -> 0.4)
        tl.fromTo(project1Ref.current, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 0.08,
            ease: 'power2.out'
        }, 0.1) // Start at 0.1
        tl.to(project1Ref.current, {
            opacity: 0,
            y: -50,
            duration: 0.08
        }, 0.32) // Starts fading out at 0.32

        //Project 2 (0.4 -> 0.7)
        tl.fromTo(project2Ref.current, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 0.08,
            ease: 'power2.out'
        }, 0.4) //fades in at 0.4, before project 1 completely fades out
        tl.to(project2Ref.current, {
            opacity: 0,
            y: -50,
            duration: 0.08
        }, 0.62)

        // Project 3 (0.7 -> 1.0)
        tl.fromTo(project3Ref.current, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 0.08,
            ease: 'power2.out'
        }, 0.7)
        tl.to(project3Ref.current, {
            opacity: 0,
            y: -50,
            duration: 0.08
        }, 0.92)

        return () => {
            timelineRef.current?.kill()
        }
    }, []);

    useEffect(() => {
        //control tieline with localProgress
        if (timelineRef.current) {
            timelineRef.current.progress(localProgress)
        }
    }, [localProgress])

    const projectRefs = [project1Ref, project2Ref, project3Ref]

    return (
        <section className="project-scene Projects" >
            {/* Step 1 */}
            <div ref={introRef} className="project-step project-text">
                <p className="project-text">This is what that looks like in practice.</p>
            </div>

            {/* Step 2-4: Individual Projects */}
            {projects.map((project, index) => (
                <div key={index} ref={projectRefs[index]} className="project-step project-item">
                    {/* Project Image */}
                    <div className="project-image">
                        <div className="image-overlay" />
                        <picture>
                            <source srcSet={project.mobileImage} media= "(max-width: 501px)" />
                            <source srcSet={project.mobileImage} media= "(max-width: 768px)" />
                            <img src={project.desktopImage} alt={project.title} />
                        </picture>
                    </div>

                    {/* Project Description */}
                    <div className={`project-description ${index % 2 === 0 ? 'right' : 'left'}`}>
                        <h3>{project.title}</h3>

                        <p>{project.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default ProjectsScene;