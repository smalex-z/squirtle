import React from 'react';
import './trip.css';
import Image from 'next/image';

interface TripProps {
    date: string;
    time: string;
    fare: string;
    address: string;
  }

const Trip: React.FC<TripProps> = ({ date, time, fare, address }) => {
  return (
    <div className="trip">
      <Image src="/logoSquirtle.png" alt="Car" className="trip-icon" width={40} height= {40}/>
      <div className="trip-details">
        <div className="trip-address">{address}</div>
        <div className="trip-datetime">{date} • {time}</div>
        <div className="trip-fare">${fare}</div>
      </div>
    </div>
  );
};

export default Trip;
