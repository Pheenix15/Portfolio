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
        </div>
      </div>
    </>
  )
}

export default App