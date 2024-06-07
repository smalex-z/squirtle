import React, { useState, useEffect } from 'react';
import './trip.css';
import Image from 'next/image';

interface TripProps {
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  title: string;
  riders: string[];
  owner: string;
}
const handleDelete = () => {
  console.log("deleted");
}

const Trip: React.FC<TripProps> = ({ date, time, pickup, dropoff, title, riders=[], owner }) => {
  const [ownerName, setOwnerName] = useState('');
  const [riderDetails, setRiderDetails] = useState<string[]>([]);
  const [ownerPhone, setOwnerPhone] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:4000/api/auth`);
      const data = await response.json();

      if (response.ok) {
        const users = data.users;
        // Fetch owner's name and phone number
        const ownerData = users.find(user => user._id === owner);
        if (ownerData) {
          setOwnerName(`${ownerData.firstName} ${ownerData.lastName}`);
          setOwnerPhone(ownerData.phoneNumber);
        }

        // Fetch riders' names and phone numbers, filtering out any IDs that do not match
        const details = riders.map(riderId => {
          const riderData = users.find(user => user._id === riderId);
          return riderData ? `${riderData.firstName} ${riderData.lastName} (${riderData.phoneNumber})` : null;
        }).filter(detail => detail); // This will only include details that are not null

        setRiderDetails(details);
      } else {
        console.error("Failed to fetch user data");
      }
    };

    fetchUsers();
  }, [riders, owner]);

  return (
    <div className="trip">
      <Image src="/logoSquirtle.png" alt="Car" className="trip-icon" width={40} height={40} />
      <div className="trip-details">
        <div className="trip-address">{dropoff} &nbsp;&nbsp;({title})</div>
        <div className="trip-datetime">{date} • {time}</div>
        <div className="trip-pickup">Pickup: {pickup}</div>
        <div className="trip-owner">Creator: {ownerName} ({ownerPhone})</div>
      </div>
      <div className="trip-riders">
        <strong>Riders:</strong>
        {riderDetails.length > 0 ? riderDetails.map((detail, index) => (
          <div key={index}>Rider {index + 1}: {detail}</div>
        )) : ' None'}
      </div>
    </div>
  );
};

export default Trip;
