import React from 'react';
import styles from './profile.module.css';
import { UserProfileProps } from './type';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfileProps;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, userProfile }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <h2>Account Info</h2>
        <form className={styles.modalForm}>
          <label>
            Name:
            <input type="text" defaultValue={userProfile.name} />
          </label>
          <label>
            Username:
            <input type="text" defaultValue={userProfile.username} />
          </label>
          <label>
            Bio:
            <input type="text" defaultValue={userProfile.bio} />
          </label>
          <div>
            <button type="button" onClick={onClose}>Close</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
