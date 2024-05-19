"use client";

import Navbar from "../Navbar";
import React, { useState } from "react";
import "./styles.css";

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input type="text" placeholder="Enter pickup location" className="search-input" />
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Enter destination" className="search-input" />
            </div>
            <button className="search-button">Find rides</button>
        </div>
    );
};

const Filter: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({});
    const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({
        location: false,
        'departure time': false,
        capacity: false,
    });

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
        setIsOpen(prevState => ({
            ...Object.keys(prevState).reduce((acc, key) => {
                acc[key] = key === filter ? !prevState[key] : false;
                return acc;
            }, {} as { [key: string]: boolean })
        }));
    };

    const handleOptionSelect = (filter: string, option: string) => {
        setSelectedOptions(prevOptions => {
            const currentOptions = prevOptions[filter] || [];
            if (currentOptions.includes(option)) {
                return {
                    ...prevOptions,
                    [filter]: currentOptions.filter(opt => opt !== option),
                };
            } else {
                return {
                    ...prevOptions,
                    [filter]: [...currentOptions, option],
                };
            }
        });
    };

    const renderOptions = (filter: string) => (
        <div className="options-dropdown">
            <div>
                <input 
                    type="checkbox" 
                    checked={selectedOptions[filter]?.includes('Option 1') || false}
                    onChange={() => handleOptionSelect(filter, 'Option 1')} 
                />
                Option 1
            </div>
            <div>
                <input 
                    type="checkbox" 
                    checked={selectedOptions[filter]?.includes('Option 2') || false}
                    onChange={() => handleOptionSelect(filter, 'Option 2')} 
                />
                Option 2
            </div>
            <div>
                <input 
                    type="checkbox" 
                    checked={selectedOptions[filter]?.includes('Option 3') || false}
                    onChange={() => handleOptionSelect(filter, 'Option 3')} 
                />
                Option 3
            </div>
        </div>
    );

    return (
        <div className="filter-container">
            <div className="filter-options">
                <b>Filter by: </b>
                <div className="filter-button-wrapper">
                    <button 
                        className={isOpen['location'] ? 'open' : ''} 
                        onClick={() => handleFilterClick('location')}
                    >
                        Location
                    </button>
                    {selectedFilter === 'location' && isOpen['location'] && renderOptions('location')}
                </div>
                <div className="filter-button-wrapper">
                    <button 
                        className={isOpen['departure time'] ? 'open' : ''} 
                        onClick={() => handleFilterClick('departure time')}
                    >
                        Departure time
                    </button>
                    {selectedFilter === 'departure time' && isOpen['departure time'] && renderOptions('departure time')}
                </div>
                <div className="filter-button-wrapper">
                    <button 
                        className={isOpen['capacity'] ? 'open' : ''} 
                        onClick={() => handleFilterClick('capacity')}
                    >
                        Capacity
                    </button>
                    {selectedFilter === 'capacity' && isOpen['capacity'] && renderOptions('capacity')}
                </div>
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <>
            <Navbar />
            <h2>Go anywhere with Squirtle</h2>
            <div className="search-bar-container">
                <SearchBar />
            </div>
            <Filter />
        </>
    );
}
