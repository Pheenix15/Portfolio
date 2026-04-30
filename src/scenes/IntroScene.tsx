import "../css/IntroScene.css"

const IntroScene = () => {
    return (
        <section className="hero" >
            <div className="hero-text">
                <p className="hello">Hello 👋</p>
                <h1 className="name">I'm Francis Odimmegwa</h1>
                <p className="title">Front-end Engineer</p>
                <div className="hero-buttons">
                    <button className="button hero-contact">Contact Me</button>
                    <button className="button hero-portfolio">View my works</button>
                </div>
            </div>

            <div className="hero-image">
                <img src="./img/me.png" alt="Francis" />
            </div>
        </section>
    );
}

export default IntroScene;