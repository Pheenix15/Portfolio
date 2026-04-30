import "../css/SkillScene.css";


const SkillScene = () => {

    return (
        <section className="skills-scene skills-section">
            {/* Step 1: Intro with watermark */}
            <div className="skills-step skills-intro">
                
                <h2 className="watermark" >My Skills</h2>
                
                
                <p className="skill-text" >
                    To do that consistently, I rely on a set of tools that help me turn ideas into working products.
                </p>
            </div>

            {/* Step 2: Primary Skills */}
            <div className="skills-step">
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
            <div className="skills-step">
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
            

            <div className="skills-step">
                <p className="skill-text stage-text" >
                    It is not just about what is built, but understanding what needs to work, who it is for, and making sure it holds up over time.
                </p>
            </div>
            

        </section>
    )
}

export default SkillScene;