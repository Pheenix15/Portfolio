import useScrollManager from './core/useScrollManager'
import IntroScene from './scenes/IntroScene'
import './App.css'
import AboutScene from './scenes/AboutScene'
import SkillScene from './scenes/SkillScene'
import ProjectsScene from './scenes/ProjectsScene'
import ContactScene from './scenes/ContactScene'

function App() {
  const { progress } = useScrollManager()

  return (
    <>
      <div className="scroll-container" />

      <div className="viewport">
        {/* <div className="scene-container">
          <IntroScene />
        </div> */}

        {/* <div className="scene-container">
          <AboutScene />
        </div> */}

        {/* <div className="scene-container">
          <SkillScene />
        </div> */}

        {/* <div className="scene-container">
          <ProjectsScene />
        </div> */}

        <div className="scene-container">
          <ContactScene />
        </div>

        {/* Debug overlay */}
        <div className="debug-overlay">
          <span>Progress: {progress.toFixed(4)}</span>

          <div className="contra-hire-me-button" data-analyticsUserId="467a11d9-9412-43c9-a031-26f42152ab6d" data-theme="dark" data-username="pheenix_web"></div><script async src="https://contra.com/static/embed/sdk.js" charSet="utf-8"></script>
        </div>
      </div>
    </>
  )
}

export default App