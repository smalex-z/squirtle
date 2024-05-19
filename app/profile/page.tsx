"use client"
import Navbar from "../Navbar";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './profile.module.css'
import { UserProfileProps } from './type';
import Modal from './modal';

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
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileInfoContainer}>
          <Image src={props.profilePictureUrl} alt="Profile Picture" className={styles.profilePicture} width={150} height={150} />
          <div className={styles.profileInfo}>
            <h1>{props.name}</h1>
            <h3>@{props.username}</h3>
            <p>{props.bio}</p>
          </div>
        </div>
        <div className={styles.rideShareCount}>
          <p className={styles.bigNumber}>{props.numberOfShares}</p>
          Ride Share Count
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.buttonWithImage}>
              <Image src="/helpSymbol.webp" alt="Help Icon" className={styles.buttonIcon} width={30} height={30} />
              Help
            </button>
            <button className={styles.buttonWithImage}>
              <Image src="/receipt.png" alt="Activity Icon" className={styles.buttonIcon} width={25} height={25} />
              Activity
            </button>
        </div>
        <button className={styles.editButton} onClick={openModal}>
          Edit Profile
          <Image src="/logoSquirtle.png" alt="Squirtle" width={30} height={30} />
        </button>

        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          userProfile={props}
        />

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
    profilePictureUrl: '/Duck.jpeg'
  };

  return <Profile {...userData} />;
}

export default Page;