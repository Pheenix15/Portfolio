import useScrollManager from './core/useScrollManager'
import useSceneProgress from './core/useSceneProgress'
import { SCENE_RANGES, type SceneName } from './core/sceneConfig'
import IntroScene from './scenes/IntroScene'
import './App.css'
import AboutScene from './scenes/AboutScene'
import SkillScene from './scenes/SkillScene'
import ProjectsScene from './scenes/ProjectsScene'
import ContactScene from './scenes/ContactScene'

function App() {
  const { progress } = useScrollManager()

  // Get localProgress for each scene
  const introProgress = useSceneProgress('intro', progress)
  const aboutProgress = useSceneProgress('about', progress)
  const skillsProgress = useSceneProgress('skills', progress)
  const projectsProgress = useSceneProgress('projects', progress)
  const contactProgress = useSceneProgress('contact', progress)

  // Determine if a scene should be visible based on global progress
  const isSceneActive = (sceneName: SceneName): boolean => {
    const range = SCENE_RANGES[sceneName]
    return progress >= range.start && progress <= range.end
  }

  return (
    <>
      <div className="scroll-container" />

      <div className="viewport">
        <div 
          className="scene-container"
          style={{
            opacity: isSceneActive('intro') ? 1 : 0,
            pointerEvents: isSceneActive('intro') ? 'auto' : 'none',
          }}
        >
          <IntroScene localProgress={introProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: isSceneActive('about') ? 1 : 0,
            pointerEvents: isSceneActive('about') ? 'auto' : 'none',
          }}
        >
          <AboutScene localProgress={aboutProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: isSceneActive('skills') ? 1 : 0,
            pointerEvents: isSceneActive('skills') ? 'auto' : 'none',
          }}
        >
          <SkillScene localProgress={skillsProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: isSceneActive('projects') ? 1 : 0,
            pointerEvents: isSceneActive('projects') ? 'auto' : 'none',
          }}
        >
          <ProjectsScene localProgress={projectsProgress} />
        </div>

        <div 
          className="scene-container"
          style={{
            opacity: isSceneActive('contact') ? 1 : 0,
            pointerEvents: isSceneActive('contact') ? 'auto' : 'none',
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