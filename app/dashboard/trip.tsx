import React from 'react';
import './trip.css';
import Image from 'next/image';

interface TripProps {
    date: string;
    time: string;
    pickup: string;
    dropoff: string;
  }

const Trip: React.FC<TripProps> = ({ date, time, pickup, dropoff }) => {
  return (
    <div className="trip">
      <Image src="/logoSquirtle.png" alt="Car" className="trip-icon" width={40} height= {40}/>
      <div className="trip-details">
        <div className="trip-address">{dropoff}</div>
        <div className="trip-datetime">{date} • {time}</div>
        <div className="trip-pickup">Pickup: {pickup}</div>
      </div>
    </div>
  );
};

export default Trip;
