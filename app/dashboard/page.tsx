"use client"

import Navbar from "../Navbar";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./dashboard.css"
import './trip.css';

import React, { useState, useEffect } from "react";

import Image from 'next/image';

export default function Page() {
  const [pastTrips, setPastTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTrips();
    fetchUsers();
  }, []);

  const fetchTrips = async () => {
    const userId = localStorage.getItem('userId');
    const response = await fetch("http://localhost:4000/api/trips");
    const data = await response.json();
    console.log(data);

    if (response.ok) {
        const currentDate = new Date();
        console.log("Success");
        const joinedTrips = data.trips.filter(trip => trip.riders.includes(userId));

        const upcoming = [];
        const past = [];

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

  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:4000/api/auth`);
    const data = await response.json();

    if (response.ok) {
      setUsers(data.users);
    } else {
      console.error("Failed to fetch user data");
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
            console.log('Successfully left the trip');

            // Update the trips state with the updated trip data
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
          {upcomingTrips.map((trip, index) => {
            const ownerData = users.find(user => user._id === trip.owner);
            const riderDetails = trip.riders.map(riderId => {
              const riderData = users.find(user => user._id === riderId);
              return riderData ? `${riderData.firstName} ${riderData.lastName} (${riderData.phoneNumber})` : null;
            }).filter(detail => detail);

            return (
              <div key={trip._id}>
                <div className="trip">
                  <Image src="/logoSquirtle.png" alt="Car" className="trip-icon" width={40} height={40} />
                  <div className="trip-details">
                    <div className="trip-address">{trip.dropoff} &nbsp;&nbsp;({trip.title})</div>
                    <div className="trip-datetime">{trip.date} • {trip.time}</div>
                    <div className="trip-pickup">Pickup: {trip.pickup}</div>
                    <div className="trip-owner">Creator: {ownerData ? `${ownerData.firstName} ${ownerData.lastName} (${ownerData.phoneNumber})` : 'Unknown'}</div>
                  </div>
                  <div className="trip-riders">
                    <strong>Riders:</strong>
                    {riderDetails.length > 0 ? riderDetails.map((detail, index) => (
                      <div key={index}>Rider {index + 1}: {detail}</div>
                    )) : ' None'}
                  </div>
                  <button onClick={() => handleLeaveTrip(trip._id)} 
                  className="btn btn-danger"
                  disabled={trip.owner.includes(userId)}>Leave Trip</button>
                </div>
              </div>
            );
          })}
        </section>
        <header className="header">
        </header>
        <section id="trips" className="trips-section">
          <h1>Past Trips</h1>
          {pastTrips.map((trip, index) => {
            const ownerData = users.find(user => user._id === trip.owner);
            const riderDetails = trip.riders.map(riderId => {
              const riderData = users.find(user => user._id === riderId);
              return riderData ? `${riderData.firstName} ${riderData.lastName} (${riderData.phoneNumber})` : null;
            }).filter(detail => detail);

            return (
              <div key={trip._id}>
                <div className="trip">
                  <Image src="/logoSquirtle.png" alt="Car" className="trip-icon" width={40} height={40} />
                  <div className="trip-details">
                    <div className="trip-address">{trip.dropoff} &nbsp;&nbsp;({trip.title})</div>
                    <div className="trip-datetime">{trip.date} • {trip.time}</div>
                    <div className="trip-pickup">Pickup: {trip.pickup}</div>
                    <div className="trip-owner">Creator: {ownerData ? `${ownerData.firstName} ${ownerData.lastName} (${ownerData.phoneNumber})` : 'Unknown'}</div>
                  </div>
                  <div className="trip-riders">
                    <strong>Riders:</strong>
                    {riderDetails.length > 0 ? riderDetails.map((detail, index) => (
                      <div key={index}>Rider {index + 1}: {detail}</div>
                    )) : ' None'}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  )
}
