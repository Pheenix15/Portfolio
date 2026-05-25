import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../css/AboutScene.css"

interface AboutSceneProps {
    localProgress: number;
}



const AboutScene = ({localProgress} : AboutSceneProps) => {
    const timelineRef = useRef<gsap.core.Timeline | null>(null); //GSAP timeline
    
    //Ref to each step's DOM element
    const introRef = useRef<HTMLDivElement>(null);
    const sequenceRef = useRef<HTMLDivElement>(null)
    const closingRef = useRef<HTMLDivElement>(null)

    //IMAGE CANVAS SCRUB (I put this here on purpose)

    //Canvas ref
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Store preloaded images
    const imagesRef = useRef<HTMLImageElement[]>([])

    //Track image loading state
    const [imagesLoaded, setImagesLoaded] = useState(false)

    const TOTAL_FRAMES = 85 // total number of frames in sequence

    // Object position in source frames (25% from right = 75% from left). So object (ME) can be centered
    const OBJECT_POSITION_X = 0.60

    //Preload all Images on mount
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises: Promise<HTMLImageElement>[] = []

            //Create promises for all image loads
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image()
                const frameNumber = String(i).padStart(4, '0') //0001, 0002, ....

                img.src = `/frames/frame_${frameNumber}.jpg`

                imagePromises.push(
                    new Promise((resolve, reject) => {
                        img.onload = () => resolve(img)
                        img.onerror = () => {
                            console.error(`Failed to load: frame-${frameNumber}.jpg`)
                            reject()
                        }
                    })
                )
            }

            try {
                //Wait for images to load
                const loadedImages = await Promise.all(imagePromises)
                imagesRef.current = loadedImages
                setImagesLoaded(true)
                console.log(`Loaded ${TOTAL_FRAMES} frames`)
            } catch (error) {
                console.error('Error loading sequence images:', error)
            }
        }

        loadImages()
    }, [])

    //GSAP animations
    useEffect(() => {
        // If refs don't exist, do nothing
        if (!introRef.current || !sequenceRef.current || !closingRef.current) return;

        // Create a paused GSAP timeline
        timelineRef.current = gsap.timeline({ paused: true});

        const tl = timelineRef.current;

        // Step 1: Intro (0.0 to 0.3)
        tl.fromTo(introRef.current, 
            {opacity: 1},
            {opacity: 0, duration: 0.3},
            0 // Start at the very beginning of the timeline
        )

        // Step 2: Sequence (0.2 to 0.8)
        tl.fromTo(sequenceRef.current, {
            opacity: 0
        },{
            opacity: 1,
            duration: 0.1,
        }, 0.3) // Start right after the intro fades out

        tl.to(sequenceRef.current, {
            opacity: 0, 
            duration: 0.1,
        }, 0.7) // Start fading out at 70% of the timeline, giving it a full 0.5 duration to fade out by 0.8

        // Step 3: Closing (0.8 to 1.0)
        tl.fromTo(closingRef.current, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
        }, 0.8) // Start right after the sequence starts fading out
        tl.to(closingRef.current, {
            opacity: 0,
            duration: 0.05
        }, 0.95)

        return () => {
            timelineRef.current?.kill();
        }
    }, []);

    // Update timeline progress based on localProgress
    useEffect(() => {
        if (timelineRef.current) {
        timelineRef.current.progress(localProgress)
        }
    }, [localProgress])
    

    //Render frames based on localProgress
    useEffect(() => {
        // If images not loaded or canvas not ready, skip
        if (!imagesLoaded || !canvasRef.current || imagesRef.current.length === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Map localProgress to sequence range (0.3 → 0.8)
        // If localProgress < 0.3, show first frame
        if (localProgress < 0.3) {
            drawFrame(0, canvas, ctx)
            return
        }
        
        // If localProgress > 0.8, show last frame
        if (localProgress > 0.8) {
            drawFrame(TOTAL_FRAMES - 1, canvas, ctx)
            return
        }
        
        // Map progress from 0.2-0.8 range to 0-1
        const sequenceProgress = (localProgress - 0.2) / 0.6
        
        // Convert to frame index (0 to 84)
        const frameIndex = Math.floor(sequenceProgress * (TOTAL_FRAMES - 1))
        const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex))
        
        // Draw the frame
        drawFrame(clampedIndex, canvas, ctx)
    }, [localProgress, imagesLoaded])

    // Draw a specific frame to canvas
    const drawFrame = (
        index: number, 
        canvas: HTMLCanvasElement, 
        ctx: CanvasRenderingContext2D
    ) => {
        const img = imagesRef.current[index]
        if (!img) return

        // Original frame (Source) dimensions
        const sourceWidth = img.width   // 1920
        const sourceHeight = img.height // 1080
        const sourceAspect = sourceWidth / sourceHeight

        // Viewport dimensions (where canvas will render)
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const viewportAspect = viewportWidth / viewportHeight

        // Set canvas to fill viewport
        canvas.width = viewportWidth
        canvas.height = viewportHeight

        // Calculate crop to cover viewport (like background-size: cover)
        let sourceX = 0
        let sourceY = 0
        let sourceCropWidth = sourceWidth
        let sourceCropHeight = sourceHeight

        // If viewport is wider than source aspect, crop height
        if (viewportAspect > sourceAspect) {
            // Viewport is wider - need to crop top/bottom from source
            sourceCropHeight = sourceWidth / viewportAspect
            sourceY = (sourceHeight - sourceCropHeight) / 2
        } else {
            // Viewport is taller - need to crop left/right from source
            sourceCropWidth = sourceHeight * viewportAspect
            
            // Calculate crop position to center on object
            // Object is at OBJECT_POSITION_X (75%) of original sourceWidth
            const objectPositionInSource = sourceWidth * OBJECT_POSITION_X
            
            // Center the crop window on the object position
            sourceX = objectPositionInSource - (sourceCropWidth / 2)
            
            // Clamp to prevent going out of bounds
            sourceX = Math.max(0, Math.min(sourceX, sourceWidth - sourceCropWidth))
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw cropped portion of image to fill canvas
        ctx.drawImage(
            img,
            sourceX,           // Where to start crop horizontally
            sourceY,           // Where to start crop vertically
            sourceCropWidth,   // Width of crop
            sourceCropHeight,  // Height of crop
            0,                 // Draw at canvas x=0
            0,                 // Draw at canvas y=0
            canvas.width,      // Fill full canvas width
            canvas.height      // Fill full canvas height
        )
    }

    return (
        <section className="about-me" >
            <div className="about-scene">
                {/* Step 1 */}
                <div ref={introRef} className="about-step about-intro">
                    <h2 className="watermark">ABOUT ME</h2>
                    <p className="about-text stage-text">My path into front-end development was not a straight line. I have worked in different environments, from factory floors to classrooms, and those experiences shaped how I approach problems today. They taught me patience, discipline, and the value of understanding the people behind the work. Those lessons now guide how I build digital products.</p>
                </div>

                {/* Step 2 */}
                <div ref={sequenceRef} className="about-step about-sequence">
                    <canvas ref={canvasRef} className="sequence-canvas"/>
                </div>

                {/* Step 3 */}
                <div ref={closingRef} className="about-step about-closing">
                    <p className="about-text stage-text">For me, development is less about writing code and more about solving problems. Every project starts with understanding what needs to work better, what needs to be clearer, and what experience the user should leave with. The goal is always the same: build something that works well, feels natural to use, and serves the people relying on it.</p>
                </div>
            </div> 
        </section>
    );
}

export default AboutScene;