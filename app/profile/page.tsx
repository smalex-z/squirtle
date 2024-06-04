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
      <div className="home-container"
      style={{ backgroundImage: `url(${props.backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
      <Navbar />
        <div
          className={styles.profileContainer}
        >
          <Image src={props.profilePictureUrl} alt="Profile Picture" className={styles.profilePicture} width={150} height={150} />
          <div className={styles.profileInfo}>
            <h1>{props.name}</h1>
            <h3>@{props.username}</h3>
            <p>{props.bio}</p>
            <button onClick={openModal}>Edit Profile</button>
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