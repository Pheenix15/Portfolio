import {projects} from '../arrays/projectArray';
import "../css/ProjectsScene.css"

const ProjectsScene = () => {
    return (
        <section className="Projects" >
            <div className="project-scene">
                {/* Step 1 */}
                <div className="project-step project-text">
                    <p className="project-text">This is what that looks like in practice.</p>
                </div>

                {/* Step 2-4: Individual Projects */}
                {projects.map((project, index) => (
                    <div key={index} className="project-step project-item">
                        {/* Project Image */}
                        <div className="project-image">
                            <div className="image-overlay" />
                            <picture>
                                <source srcSet={project.mobileImage} media= "(max-width: 501px)" />
                                <source srcSet={project.tabletImage} media= "(max-width: 768px)" />
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
            </div>
        </section>
    );
}

export default ProjectsScene;