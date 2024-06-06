"use client"
import Navbar from "../Navbar";
import "./dashboard.css"
import Trip from "./trip";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [pastTrips, setPastTrips] = useState<TripData[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch("http://localhost:4000/api/trips");
      const data = await response.json();
      console.log(data);

      if (response.ok) {
          const currentDate = new Date();
          console.log("Success");
          const userTrips = data.trips.filter(trip => trip.owner === userId);
          const joinedTrips = data.trips.filter(trip => trip.riders.includes(userId));

          const upcoming = [];
          const past = [];

          userTrips.forEach(trip => {
            const tripDate = new Date(trip.date);
            if (tripDate >= currentDate) {
              upcoming.push(trip);
            } else {
              past.push(trip);
            }
          });

          joinedTrips.forEach(trip => {
            const tripDate = new Date(trip.date);
            if (tripDate >= currentDate) {
              upcoming.push(trip);
            } else {
              past.push(trip);
            }
          });

          setUpcomingTrips(upcoming);
          setPastTrips(past);
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
              title={trip.title}
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
          {pastTrips.map((trip, index) => (
            <Trip 
              key={index}
              title={trip.title}
              date={trip.date}
              time={trip.time}
              pickup={trip.pickup}
              dropoff={trip.dropoff}
            />
          ))}
        </section>
      </main>
    </div>
  )
}