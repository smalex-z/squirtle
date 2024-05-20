type Ride = {
  title: string;
  date: string;
  dropOffLocation: string;
};

export interface UserProfileProps {
  name: string;
  username: string;
  bio: string;
  email: string;
  numberOfShares: number;
  profilePictureUrl: string;
  backgroundUrl: string;
  rides: Ride[];
};