import React, { useState } from 'react';
import './styles.css'
import { signOutUser } from '../../firebase';

const ProfilePage = () => {

  const handleLogout = () => {
    signOutUser();
  }

  return (
    <div className='baseContainer'>
      <div className='loginButtonContainer'>
        <button className='loginButton' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
