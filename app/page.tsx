import Navbar from "./Navbar";
import './Page.css';

export default function Page() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1>SQUIRTLE</h1>
        <p>A rideshare app for students that makes them save money</p>
      </div>
    </div>
  )
}