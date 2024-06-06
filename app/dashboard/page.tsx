"use client"
import Navbar from "../Navbar";
import "./dashboard.css"
import Trip from "./trip";
import React, { useState, useEffect } from "react";

export default function Page() {
  //const [pastTrips, setPastTrips] = useState<TripData[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
        const response = await fetch("http://localhost:4000/api/trips");
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            console.log("Success");
            setUpcomingTrips(data.trips);
        }
    };

    fetchTrips();
}, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
      <header className="header">
        </header>
      <section id="upcoming-trips" className="trips-section">
          <h1>Upcoming Trips</h1>
          {upcomingTrips.map((trip, index) => (
            <Trip 
              key={index}
              date={trip.date}
              time={trip.time}
              pickup={trip.pickup}
              dropoff={trip.dropoff}
            />
          ))}
        </section>
        <header className="header">
        </header>
        <section id="trips" className="trips-section">
          <h1>Past Trips</h1>
        </section>
      </main>
    </div>
  )
}