import Navbar from "../Navbar";
import React from "react";
import "./styles.css"

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <input type="text" placeholder="I need a ride to..." className="search-input" />
                <button className="search-button">Search</button>
            </div>
        </div>
    );
};

export default function Page() {
    return (
      <>
        <Navbar />
        <h1>Search</h1>
        <div className="search-bar-container">
            <SearchBar />
        </div>
      </>
    )
  }