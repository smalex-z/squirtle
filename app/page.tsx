import Navbar from "./Navbar";
import './Page.css';

export default function Page() {
  return (
    <>
    <section className="home-container">
        <Navbar />
        <div className="home-content">
          <h1>SQUIRTLE</h1>
          <p>A rideshare app for students that makes them save money</p>
        </div>
      </section>

      <section className="about-container">
        <div className="about-content">
          <div className="title">
            <h1>Introduction</h1>
            <h3>What is SQUIRTLE?</h3>
          </div>
          <p>
            <span>SQUIRTLE is a revolutionary rideshare app</span> 
            <span>Designed specifically for UCLA students</span>
          </p>
        </div>
      </section>

      <section className="mva-container">
        <div className="mva-content">
          <div className="mva">
            <div className="mva-item">
              <h4>01</h4>
              <p>Our Mission</p>
            </div>
            <p>Enhancing Student Transportation</p>
          </div>
          <div className="mva">
            <div className="mva-item">
              <h4>02</h4>
              <p>Our Vision</p>
            </div>
            <p>Expanding Through the Country</p>
          </div>
          <div className="mva">
            <div className="mva-item">
              <h4>03</h4>
              <p>Our Ambition</p>
            </div>
            <p>Transforming Campus Commutes</p>
          </div>
        </div>
      </section>
    </>
  )
}