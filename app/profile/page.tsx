"use client"
import { useState, useEffect } from "react";
import Image from 'next/image';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import { UserProfileProps } from './type';

import '../Page.css';
import Navbar from '../Navbar';

const Profile = (props: UserProfileProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch("http://localhost:4000/api/trips");
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("Success");
        const userTrips = data.trips.filter(trip => trip.owner === userId);
        setTrips(userTrips);
      }
    };

    fetchTrips();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="home-container">
        <Navbar />
        <div
          className="row wholeContainer "
        >
          <div className="col-4 d-flex justify-content-center">
            <div className="profileContainer"
              style={{ backgroundImage: `url(${props.backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Image src={props.profilePictureUrl} alt="Profile Picture" className="profilePicture" width={150} height={150} />
              <div className="profileInfo">
                <h1>{props.name}</h1>
                <h3>@{props.username}</h3>
                <p>{props.bio}</p>
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
                                                <strong>Pickup:</strong> {trip.pickup}<br />
                                                <strong>Dropoff:</strong> {trip.dropoff}<br />
                                                <strong>Date:</strong> {trip.date}<br />
                                                <strong>Time:</strong> {trip.time}
                                            </p>
                                            <a href="#" className="search-button" style={{ textDecoration: 'none' }}>Join Trip</a>
                                        </div>
                                    </div>
                                ))}
          </div>
          {/* 
          <div className="myRides">
            {props.rides.map((ride, index) => (
              <div key={index} className="ride">
                <h2>{ride.title}</h2>
                <p>{ride.date}</p>
                <p>{ride.dropOffLocation}</p>
              </div>
            ))}
          </div> */}
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