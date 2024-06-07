"use client";

import Navbar from "../Navbar";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./dashboard.css"
import './trip.css';

import React, { useState, useEffect } from "react";

import Image from 'next/image';


export default function Page() {
  const [pastTrips, setPastTrips] = useState<TripData[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
}, []);

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

  const handleLeaveTrip = async (tripId) => {
    try {
        const userId = localStorage.getItem('userId');

        const response = await fetch(`http://localhost:4000/api/trips/${tripId}/leave`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ riderId: userId }),
        });

        if (response.ok) {
            const updatedTrip = await response.json();
            console.log('Successfully left the trip', updatedTrip);

            // Update the trips and filteredTrips state with the updated trip
            fetchTrips();
        } else {
            console.error('Error leaving the trip', response.statusText);
        }
    } catch (error) {
        console.error('Error leaving the trip', error);
    }
  };

  const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
      <header className="header">
        </header>
      <section id="upcoming-trips" className="trips-section">
          <h1>Upcoming Trips</h1>
          {upcomingTrips.map((trip, index) => (
            <div key={trip._id}>
              <div className="trip">
                <Image src="/logoSquirtle.png" alt="Car" className="trip-icon" width={40} height={40} />
                <div className="trip-details">
                  <div className="trip-address">{trip.dropoff} &nbsp;&nbsp;({trip.title})</div>
                  <div className="trip-datetime">{trip.date} • {trip.time}</div>
                  <div className="trip-pickup">Pickup: {trip.pickup}</div>
                </div>
                <button onClick={() => handleLeaveTrip(trip._id)} 
                className="btn btn-danger"
                disabled={trip.owner.includes(userId)}>Leave Trip</button>
              </div>
            </div>
          ))}
        </section>
        <header className="header">
        </header>
        <section id="trips" className="trips-section">
          <h1>Past Trips</h1>
          {pastTrips.map((trip, index) => (
            <div key={trip._id}>
            <div className="trip">
              <Image src="/logoSquirtle.png" alt="Car" className="trip-icon" width={40} height={40} />
              <div className="trip-details">
                <div className="trip-address">{trip.dropoff} &nbsp;&nbsp;({trip.title})</div>
                <div className="trip-datetime">{trip.date} • {trip.time}</div>
                <div className="trip-pickup">Pickup: {trip.pickup}</div>
              </div>
            </div>
          </div>
          ))}
        </section>
      </main>
    </div>
  )
}