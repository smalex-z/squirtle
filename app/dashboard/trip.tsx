import React from 'react';
import './trip.css';

interface TripProps {
    date: string;
    time: string;
    fare: string;
    address: string;
  }

const Trip: React.FC<TripProps> = ({ date, time, fare, address }) => {
  return (
    <div className="trip">
      <img src="../logoSquirtle.png" alt="Car" className="trip-icon" />
      <div className="trip-details">
        <div className="trip-address">{address}</div>
        <div className="trip-datetime">{date} • {time}</div>
        <div className="trip-fare">${fare}</div>
      </div>
    </div>
  );
};

export default Trip;
