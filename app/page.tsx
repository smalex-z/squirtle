import Navbar from "./Navbar";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Page.css';
import Image from 'next/image';

export default function Page() {

  return (
    <>
      <section className="home-container">
        <Navbar />
        <div className="home-content">
          <h1>SQUIRTLE</h1>
          <p>Enhancement of the university transportation experience</p>
        </div>
      </section>

      <section className="about-container">
        <div className="about-content">
          <div className="title">
            <h1>Introduction</h1>
            <h3>What is SQUIRTLE?</h3>
          </div>
          <p>
            <span>SQUIRTLE is a revolutionary rideshare app,</span>
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
            <p>Expanding to all Universities</p>
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

      <section className="join-container">
        <div className="join-content">
          <h1>Join SQUIRTLE today!</h1>
          <Image src="/logoSquirtle.png" alt="SQUIRTLE rideshare" height={150} width={150}/>
          <p>Discover innovative rideshare and save money TOO!</p>
        </div>
      </section>

    </>
  )
}