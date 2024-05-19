import Navbar from "../Navbar";
import React from 'react';
import Image from 'next/image';
import styles from './profile.module.css'

interface UserProfileProps {
  name: string;
  username: string
  grad_date: string;
  email: string;
  numberOfShares: number
  profilePictureUrl: string;
}

const Profile = (props: UserProfileProps) => {
  return (
    <>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileInfoContainer}>
          <Image src={props.profilePictureUrl} alt="Profile Picture" className={styles.profilePicture} width={150} height={150} />
          <div className={styles.profileInfo}>
            <h1>{props.name}</h1>
            <h3>@{props.username}</h3>
            <p>UCLA {props.grad_date}</p>
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
        <button className={styles.editButton}>
          Edit Profile
          <Image src="/logoSquirtle.png" alt="Squirtle" width={30} height={30} />
        </button>
      </div>
    </>
  );
}

const Page = () => {
  const userData: UserProfileProps = {
    name: 'Kevin Sun',
    username: 'duckonwheels',
    grad_date: '2027',
    email: 'krsun05@g.ucla.edu',
    numberOfShares: 42,
    profilePictureUrl: '/Duck.jpeg'
  };

  return <Profile {...userData} />;
}

export default Page;