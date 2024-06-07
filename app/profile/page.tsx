"use client"
import { useState, useEffect } from "react";
import Image from 'next/image';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import { UserProfileProps } from './type';

import Navbar from '../Navbar';

const Profile = (props: UserProfileProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const [profile, setProfile] = useState([]);


  useEffect(() => {
    fetchProfile();
    fetchTrips();
  }, []);

  const fetchProfile = async () => {
    console.log("Fetching Profile");
    const userId = localStorage.getItem('userId');
    const response = await fetch(`http://localhost:4000/api/auth/${userId}`);
    const data = await response.json();
    
    console.log(data);
    if (response.ok) {
      console.log("Fetch User Success");
      setProfile(data.user);
    } else {
      console.error('Error fetching profile data:', response.statusText);
    }
  };
  
  const fetchTrips = async () => {
    const userId = localStorage.getItem('userId');
    const response = await fetch("http://localhost:4000/api/trips");
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log("Fetch Trip Success");
      const userTrips = data.trips.filter(trip => trip.owner === userId);
      setTrips(userTrips);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      const userId = localStorage.getItem('userId');

      const response = await fetch(`http://localhost:4000/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ riderId: userId }),
      });

      if (response.ok) {
        const updatedTrip = await response.json();
        console.log('Successfully deleting the trip', updatedTrip);

        // Update the trips and filteredTrips state with the updated trip
        fetchTrips();
        
      } else {
        console.error('Error deleting the trip', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting the trip', error);
    }
  };

  return (
    <>
      <div className="diff-container">
        <Navbar />
        <div
          className="row wholeContainer "
        >
          <div className="col-4 d-flex justify-content-center">
            <div className="profileContainer"
              style={{ backgroundImage: `url(${props.backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Image src={props.profilePictureUrl} alt="Profile Picture" className="profilePicture" width={150} height={150} />
              <div className="profileInfo">
                <h1>{profile.firstName} {profile.lastName}</h1>
                <h3>@{profile.username}</h3>
                <p>📱{profile.phoneNumber}</p>
                <p>📧{profile.email}</p>

                <button className="btn btn-primary" onClick={openModal}>Edit Account</button>
              </div>
            </div>
          </div>
          <div className="col-8 myRides"
            style={{ backgroundImage: `url(${props.backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {trips && trips.map((trip) => (
              <div key={trip.id} className="card trip_card rounded" style={{ width: 'auto', margin: '10px', padding: '10px' }}>
                <div className="card-body">
                  <h4 className="card-title" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>{trip.title}</h4>
                  <p className="card-text" style={{ maxWidth: '100%', wordWrap: 'break-word', marginBottom: '10px' }}>
                    <strong>Trip:</strong> {trip.pickup} → {trip.dropoff}<br />
                    <strong>Date:</strong> {trip.date}<br />
                    <strong>Time:</strong> {trip.time}
                  </p>
                  <button className="delete-button">
                    <span className="delete-span" onClick={() => handleDeleteTrip(trip._id)}>
                    CONFIRM DELETE
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>   
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const Page = () => {
  const userData: UserProfileProps = {
    name: 'Kevin Sun',
    username: 'duckonwheels',
    bio: 'UCLA 2027',
    email: 'krsun05@g.ucla.edu',
    numberOfShares: 42,
    profilePictureUrl: '/Duck.jpeg',
    backgroundUrl: '/defaultProfileBackground.avif',
    rides: [
      { title: 'Ride 1', date: '2024-01-01', dropOffLocation: 'Location 1' },
      { title: 'Ride 2', date: '2024-01-02', dropOffLocation: 'Location 2' },
    ],
  };

  return <Profile {...userData} />;
}

export default Page;