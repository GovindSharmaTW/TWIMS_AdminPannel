import React, { useEffect, useState } from 'react';
import './styles.css'
import { signOutUser } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/images/profile.jpg'

const ProfilePage = () => {

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem("user");

    console.log("TT01 profile screen userData is", userData);

    setUserEmail(JSON.parse(userData));
  }, [])

  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser().then((res) => {

      if (res) {
        navigate('/');
      }
    });
  }

  return (
    <div className='baseContainer'>
      <img src={profile} alt="" className='profileImage' />
      <h1 className='emailText'>Email : {userEmail}</h1>
      <div className='logoutButtonContainer'>
        <button className='logoutButton' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
