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
      <div className= {styles.profileContainer}>
        <Image src = {props.profilePictureUrl} alt = "Profile Picture" className={styles.profilePicture} width = {300} height = {400}/>
        <h1 className= {styles.profileHeader}>{props.name}</h1>
        <div className = {styles.profileInfo}>
          <p>@{props.username}</p>
          <p>UCLA {props.grad_date}</p>
          <p>Email: {props.email}</p>
          <p>Ride Share Count: {props.numberOfShares}</p>
        </div>
      </div>
    </>
  )

}

const Page = () => {
  const userData: UserProfileProps = {
    name: 'Kevin Sun',
    username: 'wheelsonduck',
    grad_date: '2027',
    email: 'krsun05@g.ucla.edu',
    numberOfShares: 42,
    profilePictureUrl: '/Duck.jpeg'
  };

  return <Profile {...userData} />;
}

export default Page;