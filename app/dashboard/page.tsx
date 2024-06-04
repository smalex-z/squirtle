"use client"
import Navbar from "../Navbar";
import "./dashboard.css"
import Trip from "./trip";
import React, { useState, useEffect } from "react";

interface TripData {
  date: string;
  time: string;
  fare: string;
  address: string;
}

export default function Page() {
  const [pastTrips, setPastTrips] = useState<TripData[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<TripData[]>([]);

  useEffect(() => {
    const fetchedPastTrips = [
      { date: "May 26", time: "6:02 PM", fare: "21.91", address: "Golden Gate Bridge Welcome Center" },
      { date: "May 21", time: "6:06 PM", fare: "15.93", address: "1990 Corinth Ave" },
      { date: "Apr 7", time: "4:48 PM", fare: "34.95", address: "251 Charles E Young Dr W" },
      { date: "Apr 7", time: "10:51 AM", fare: "30.98", address: "Crypto.com Arena" },
      { date: "Mar 31", time: "2:34 PM", fare: "41.98", address: "251 Charles E Young Dr W" },
      { date: "Mar 23", time: "8:16 AM", fare: "64.93", address: "Gates 21 - 28" },
      { date: "Mar 1", time: "9:19 PM", fare: "15.99", address: "251 Charles E Young Dr W" }
    ];

    const fetchedUpcomingTrips = [
      { date: "June 15", time: "2:00 PM", fare: "25.00", address: "San Francisco Airport" },
      { date: "June 20", time: "10:00 AM", fare: "18.50", address: "Silicon Valley Tech Hub" }
    ];

    setPastTrips(fetchedPastTrips);
    setUpcomingTrips(fetchedUpcomingTrips);
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
              fare={trip.fare}
              address={trip.address}
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
              date={trip.date}
              time={trip.time}
              fare={trip.fare}
              address={trip.address}
            />
          ))}
        </section>
      </main>
    </div>
  )
}
