import useScrollManager from './core/useScrollManager'
import useSceneProgress from './core/useSceneProgress'
import { SCENE_RANGES, type SceneName } from './core/sceneConfig'
import IntroScene from './scenes/IntroScene'
import './App.css'
import AboutScene from './scenes/AboutScene'
import SkillScene from './scenes/SkillScene'
import ProjectsScene from './scenes/ProjectsScene'
import ContactScene from './scenes/ContactScene'
import Nav from './components/Nav'

function App() {
  const { progress } = useScrollManager()

  // Get localProgress for each scene
  const introProgress = useSceneProgress('intro', progress)
  const aboutProgress = useSceneProgress('about', progress)
  const skillsProgress = useSceneProgress('skills', progress)
  const projectsProgress = useSceneProgress('projects', progress)
  const contactProgress = useSceneProgress('contact', progress)

  //Calculate scene opacity with overlap transitions
  const getSceneOpacity = (sceneName: SceneName): number => {
    const range = SCENE_RANGES[sceneName]
    const transitionDuration = 0.05 // 5% overlap on each side
    
    // Before scene starts
    if (progress < range.start - transitionDuration) {
      return 0
    }
    
    // Fade in at start
    if (progress < range.start) {
      const fadeInProgress = (progress - (range.start - transitionDuration)) / transitionDuration
      return fadeInProgress
    }
    
    // Fully visible in middle
    if (progress >= range.start && progress <= range.end) {
      return 1
    }
    
    // Fade out at end
    if (progress > range.end && progress < range.end + transitionDuration) {
      const fadeOutProgress = (progress - range.end) / transitionDuration
      return 1 - fadeOutProgress
    }
    
    // After scene ends
    return 0
  }

  return (
    <>
      <div className="scroll-container" />

      <div className="viewport">
        <Nav/>
        
        <div 
          className="scene-container"
          style={{
            opacity: getSceneOpacity('intro'),
            pointerEvents: getSceneOpacity('intro') > 0 ? 'auto' : 'none',
          }}
        >
          <IntroScene localProgress={introProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: getSceneOpacity('about'),
            pointerEvents: getSceneOpacity('about') > 0 ? 'auto' : 'none',
          }}
        >
          <AboutScene localProgress={aboutProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: getSceneOpacity('skills'),
            pointerEvents: getSceneOpacity('skills') > 0 ? 'auto' : 'none',
          }}
        >
          <SkillScene localProgress={skillsProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: getSceneOpacity('projects'),
            pointerEvents: getSceneOpacity('projects') > 0 ? 'auto' : 'none',
          }}
        >
          <ProjectsScene localProgress={projectsProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: getSceneOpacity('contact'),
            pointerEvents: getSceneOpacity('contact') > 0 ? 'auto' : 'none',
          }}
        >
          <ContactScene localProgress={contactProgress} />
        </div>

        {/* Debug overlay */}
        <div className="debug-overlay">
          <div>Global: {progress.toFixed(4)}</div>
          <div>Intro: {introProgress.toFixed(4)}</div>
          <div>About: {aboutProgress.toFixed(4)}</div>
          <div>Skills: {skillsProgress.toFixed(4)}</div>
          <div>Projects: {projectsProgress.toFixed(4)}</div>
          <div>Contact: {contactProgress.toFixed(4)}</div>

          <div className="contra-hire-me-button" data-analyticsUserId="467a11d9-9412-43c9-a031-26f42152ab6d" data-theme="dark" data-username="pheenix_web"></div><script async src="https://contra.com/static/embed/sdk.js" charSet="utf-8"></script>
        </div>
      </div>
    </>
  )
}

export default App