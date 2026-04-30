import "../css/AboutScene.css"

// gsap.registerPlugin(scrollTrigger);

const AboutScene = () => {

    return (
        <section className="about-me" >
            <div className="about-scene">
                {/* Step 1 */}
                <div className="about-step about-intro">
                    <h2 className="watermark">ABOUT ME</h2>
                    <p className="about-text stage-text">My path into front-end development was not a straight line. I have worked in different environments, from factory floors to classrooms, and those experiences shaped how I approach problems today. They taught me patience, discipline, and the value of understanding the people behind the work. Those lessons now guide how I build digital products.</p>
                </div>

                {/* Step 2 */}
                <div className="about-step about-sequence">
                    <canvas className="sequence-canvas"/>
                </div>

                {/* Step 3 */}
                <div className="about-step about-closing">
                    <p className="about-text stage-text">For me, development is less about writing code and more about solving problems. Every project starts with understanding what needs to work better, what needs to be clearer, and what experience the user should leave with. The goal is always the same: build something that works well, feels natural to use, and serves the people relying on it.</p>
                </div>
            </div> 
        </section>
    );
}

export default AboutScene;