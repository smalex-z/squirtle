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
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    const fetchedTrips = [
      { date: "May 26", time: "6:02 PM", fare: "21.91", address: "Golden Gate Bridge Welcome Center" },
      { date: "May 21", time: "6:06 PM", fare: "15.93", address: "1990 Corinth Ave" },
      { date: "Apr 7", time: "4:48 PM", fare: "34.95", address: "251 Charles E Young Dr W" },
      { date: "Apr 7", time: "10:51 AM", fare: "30.98", address: "Crypto.com Arena" },
      { date: "Mar 31", time: "2:34 PM", fare: "41.98", address: "251 Charles E Young Dr W" },
      { date: "Mar 23", time: "8:16 AM", fare: "64.93", address: "Gates 21 - 28" },
      { date: "Mar 1", time: "9:19 PM", fare: "15.99", address: "251 Charles E Young Dr W" }
    ];
    setTrips(fetchedTrips);
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <header className="header">
        </header>
        <section id="trips" className="trips-section">
          <h1>Past Trips</h1>
          {trips.map((trip, index) => (
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