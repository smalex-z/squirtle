"use client";

import { useState, useEffect, useRef } from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../Navbar";
import "./styles.css";

const locations = ["UCLA", "USC", "LAX", "Santa Monica", "Sawtelle", "Koreatown", "Little Tokyo", "Union Station"];
const destinations = ["UCLA", "USC", "LAX", "Santa Monica", "Sawtelle", "Koreatown", "Little Tokyo", "Union Station"];

function DropdownSearch() {
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
                setSelectedOption1("Select location"); // Revert to the default text
            } else {
                setSelectedOption1(option);
            }
            setOpenDropdown(null);
        } else {
            if (selectedOption2 === option) {
                setSelectedOption2("Select destination"); // Revert to the default text
            } else {
                setSelectedOption2(option);
            }
            setOpenDropdown(null);
        }
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
                                {locations.map((location, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-option"
                                        onClick={() => handleOptionSelect(2, location)}
                                    >
                                        {location}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="button-group">
                <button className="search-button">
                    Find rides
                </button>
                <button className="search-button">
                    Create a ride
                </button>
            </div>
        </div>
    );
}

export default function Page() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async() => {
            const response = await fetch("http://localhost:4000/api/trips");
            const data = await response.json();
            console.log(data);

            if(response.ok) {
                console.log("Success");
                setTrips(data.trips);
            } 

        }

        fetchTrips();
    }, [])

    useEffect(() => {
        console.log("Trips: ", trips)
    })

    return (
        <>
        <div className="ride-container">
            <Navbar />
            <div className="container my-3 mb-5">
                <div className="row h-100">
                    <div className="col-3">
                        <div className="row ride-search py-3">
                            <div className="row text-container">
                                <h2>Get a ride:</h2>
                            </div>
                            <div className="row">
                                <DropdownSearch />
                            </div>
                        </div>
                    </div>
                    <div className="col-9 h-100">
                        <div className="row find-ride ms-5 py-3">
                            <h1>Choose a ride:</h1>
                            <div>
                                {trips && trips.map((trip) => (
                                    <p key={trip._id}>{trip.title}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}