"use client"

import React, { useState, useEffect, useRef } from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
import Modal from "./Modal";
import TripForm from "./tripsForm"

import Navbar from "../Navbar";



const locations = ["UCLA", "USC", "LAX", "Santa Monica", "Sawtelle", "Koreatown", "Little Tokyo", "Union Station"];
const destinations = ["UCLA", "USC", "LAX", "Santa Monica", "Sawtelle", "Koreatown", "Little Tokyo", "Union Station"];

function DropdownSearch({ onFindRides, setShowModal }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedOption1, setSelectedOption1] = useState("Select location");
    const [selectedOption2, setSelectedOption2] = useState("Select destination");
    const dropdownRef1 = useRef(null);
    const dropdownRef2 = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef1.current &&
                !dropdownRef1.current.contains(event.target) &&
                openDropdown === 1
            ) {
                setOpenDropdown(null);
            }
            if (
                dropdownRef2.current &&
                !dropdownRef2.current.contains(event.target) &&
                openDropdown === 2
            ) {
                setOpenDropdown(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

    const handleDropdownToggle = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    const handleOptionSelect = (dropdownId, option) => {
        if (dropdownId === 1) {
            if (selectedOption1 === option) {
                setSelectedOption1("Select location");
            } else {
                setSelectedOption1(option);
            }
            setOpenDropdown(null);
        } else {
            if (selectedOption2 === option) {
                setSelectedOption2("Select destination");
            } else {
                setSelectedOption2(option);
            }
            setOpenDropdown(null);
        }
    };

    const handleFindRides = () => {
        onFindRides(selectedOption1, selectedOption2);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar-wrapper">
                <div className="dropdown-wrapper">
                    <div ref={dropdownRef1} className="filter-button-wrapper search-bar">
                        <button
                            className={`btn custom-dropdown search-input ${openDropdown === 1 ? "open" : ""}`}
                            type="button"
                            onClick={() => handleDropdownToggle(1)}
                        >
                            {selectedOption1}
                        </button>
                        {openDropdown === 1 && (
                            <ul className="options-dropdown">
                                {locations.map((location, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-option"
                                        onClick={() => handleOptionSelect(1, location)}
                                    >
                                        {location}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="dropdown-wrapper">
                    <div ref={dropdownRef2} className="filter-button-wrapper search-bar">
                        <button
                            className={`btn custom-dropdown search-input ${openDropdown === 2 ? "open" : ""}`}
                            type="button"
                            onClick={() => handleDropdownToggle(2)}
                        >
                            {selectedOption2}
                        </button>
                        {openDropdown === 2 && (
                            <ul className="options-dropdown">
                                {destinations.map((destination, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-option"
                                        onClick={() => handleOptionSelect(2, destination)}
                                    >
                                        {destination}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="button-group-4">
                <button className="btn search-button" onClick={handleFindRides}>
                    Find Rides
                </button>

                <button className="btn search-button" onClick={() => setShowModal(true)}>
                    Create Ride
                </button>
            </div>
        </div>
    );
}

export default function Page() {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [clickedTrip, setClickedTrip] = useState(null);
    const [riderDetails, setRiderDetails] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        fetchUsers();
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        const response = await fetch("http://localhost:4000/api/trips");
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            console.log("Success");
            setTrips(data.trips);
            setFilteredTrips(data.trips);
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

    const handleAddTrip = (newTrip) => {
        setTrips([...trips, newTrip]);
        setFilteredTrips([...trips, newTrip]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleFindRides = (location, destination) => {
        if (location !== "Select location" && destination !== "Select destination") {
            const filtered = trips.filter(
                (trip) => trip.pickup === location && trip.dropoff === destination
            );
            setFilteredTrips(filtered);
        } else if (location !== "Select location") {
            const filtered = trips.filter(
                (trip) => trip.pickup === location
            );
            setFilteredTrips(filtered);
        } else if (destination !== "Select destination") {
            const filtered = trips.filter(
                (trip) => trip.dropoff === destination
            );
            setFilteredTrips(filtered);
        } else {
            setFilteredTrips(trips);
        }
    };

    const handleJoinTrip = async (tripId) => {
        try {
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:4000/api/trips/${tripId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ riderId: userId }),
            });
    
            if (response.ok) {
                const updatedTrip = await response.json();
                console.log('Successfully joined the trip', updatedTrip);
    
                // Update the trips and filteredTrips state with the updated trip
                fetchTrips();
            } else {
                console.error('Error joining the trip', response.statusText);
            }
        } catch (error) {
            console.error('Error joining the trip', error);
        }
    };


    // Function to handle click on trip card
    const handleTripClick = (trip) => {
        setClickedTrip(clickedTrip === trip._id ? null : trip._id);
        setRiderDetails(clickedTrip === trip._id ? [] : trip.riders);
        console.log(trip.riders);
    };
    
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    

    return (
        <>
            <div className="ride-container">
                <Navbar />
                <div className="container custom-container my-3 mb-5">
                        <div className="row stick-box" style={{ justifyContent: 'center'}}>
                            <div className="col ride-search search-box py-3 sticky">
                                <div className="row text-container">
                                    <h2>Get Your Trip</h2>
                                </div>
                                <div className="row">
                                    <DropdownSearch onFindRides={handleFindRides} setShowModal={setShowModal} />
                                </div>
                            </div>
                            <div className="col ride-search map-box find-ride py-3">
                                {filteredTrips && filteredTrips.map((trip) =>{
                                    const ownerData = users.find(user => user._id === trip.owner);
                                     const riderDetails = trip.riders.map(riderId => {
                                        const riderData = users.find(user => user._id === riderId);
                                        return riderData ? `${riderData.firstName} ${riderData.lastName} (${riderData.phoneNumber})` : null;
                                      }).filter(detail => detail);
                                    return(
                                    <div 
                                        key={trip._id} 
                                        className={`card trip_card rounded ${clickedTrip === trip._id ? 'clicked' : ''}`} 
                                        style={{ width: 'auto', margin: '10px', padding: '10px' }}
                                        onClick={() => handleTripClick(trip)}
                                    >
                                        <div className="card-body">
                                            <h4 className="card-title" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>{trip.title}</h4>
                                            <p className="card-text" style={{ maxWidth: '100%', wordWrap: 'break-word', marginBottom: '10px' }}>
                                                <strong>Pickup:</strong> {trip.pickup}<br />
                                                <strong>Dropoff:</strong> {trip.dropoff}<br />
                                                <strong>Date:</strong> {trip.date}<br />
                                                <strong>Time:</strong> {trip.time}
                                            </p>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent triggering the card click
                                                    handleJoinTrip(trip._id);
                                                }}
                                                className="search-button btn btn-primary" 
                                                style={{ textDecoration: 'none' }}
                                                disabled={trip.riders.includes(userId)}
                                            >
                                                Join Trip
                                            </button>
                                            {clickedTrip === trip._id && (
                                                <div className="overlay">
                                                    <div>
                                                        <h5>Rider Information</h5>
                                                        {riderDetails.length > 0 ? riderDetails.map((detail, index) => (
                                                        <div key={index}>Rider {index + 1}: {detail}</div>
                                                        )) : ' None'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                                })}
                            </div>

                    </div>
                </div>
            </div>
            <Modal show={showModal} handleClose={handleCloseModal}>
                <TripForm onAddTrip={handleAddTrip} handleCloseModal={handleCloseModal}/>
            </Modal>
        </>
    );
}