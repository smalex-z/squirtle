"use client";

import { useState } from "react";
import Navbar from "../Navbar";
import "./styles.css";

const locations = ["Location 1", "Location 2", "Location 3", "Location 4"];

function DropdownSearch() {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (dropdownId) => {
        setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    onClick={() => handleDropdownToggle(1)}
                >
                    Select Location 1
                    <span className={`ms-2 ${openDropdown === 1 ? "arrow-up" : "arrow-down"}`}></span>
                </button>
                {openDropdown === 1 && (
                    <ul className="dropdown-menu show w-100">
                        {locations.map((location, index) => (
                            <li key={index}>
                                <a className="dropdown-item" href="#">
                                    {location}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="dropdown mt-2">
                <button
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    onClick={() => handleDropdownToggle(2)}
                >
                    Select Location 2
                    <span className={`ms-2 ${openDropdown === 2 ? "arrow-up" : "arrow-down"}`}></span>
                </button>
                {openDropdown === 2 && (
                    <ul className="dropdown-menu show w-100">
                        {locations.map((location, index) => (
                            <li key={index}>
                                <a className="dropdown-item" href="#">
                                    {location}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button className="btn btn-primary mt-3" style={{ backgroundColor: "#2774AE", borderColor: "#2774AE" }}>
                Search
            </button>
        </div>
    );
}

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2>Go anywhere with Squirtle</h2>
                <DropdownSearch />
            </div>
        </>
    );
}
