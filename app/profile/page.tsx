"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './profile.module.css'
import { UserProfileProps } from './type';
import Modal from './modal';

import '../Page.css';
import Navbar from '../Navbar';

const Profile = (props: UserProfileProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className={styles.profileContainer}
          style={{ backgroundImage: `url(${props.backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <Image src={props.profilePictureUrl} alt="Profile Picture" className={styles.profilePicture} width={150} height={150} />
          <div className={styles.profileInfo}>
            <h1>{props.name}</h1>
            <h3>@{props.username}</h3>
            <p>{props.bio}</p>
            <input type="password" placeholder="Password" />
            <button onClick={openModal}>Change Password</button>
          </div>
          <div className={styles.myRides}>
            {props.rides.map((ride, index) => (
              <div key={index} className={styles.ride}>
                <h2>{ride.title}</h2>
                <p>{ride.date}</p>
                <p>{ride.dropOffLocation}</p>
              </div>
            ))}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            userProfile={props}
          />
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