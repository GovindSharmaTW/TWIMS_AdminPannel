import React, { useState } from 'react';
import './styles.css'
import inventory from '../../assets/images/inventory.jpg'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [allEntry, setAllEntry] = useState([])



  const handleLogin = () => {
    // Here you can add your login logic, such as sending a request to your backend
    // to validate the username and password
    if (username === 'yourUsername' && password === 'yourPassword') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (loggedIn) {
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  const submitForm = (e: any) => {
    e.preventDefault();
    console.log("TT01 submitForm function called");
    const newUser = { email: email, password: password };

    setAllEntry([newUser]);

  }

  return (
    <div className='baseContainer'>
      <div className='primaryContainer'>
          <img src={inventory} alt="" className="imageStyle"/>
      </div>

      <div className='secondaryContainer'>
        <div className='mainDiv' >
          <div className='headingContainer'>
            <p className='headingStyle'>Log in to your account</p>
            <p className='subHeadingStyle'>Welcome back! Please enter your details.</p>
          </div>

          <div className='inputContainer'>
            <label className='inputLabel'>Email</label>
            <input type="text" placeholder='Enter your email' className='inputStyle' />
          </div>

          <div className='inputContainer'>
            <label className='inputLabel'>Password</label>
            <input type="text" placeholder='Enter your password' className='inputStyle' />
          </div>

          <div className='textContainer' >
            <label className='inputLabel'><input type="checkbox" className='checkBoxStyle' />Remember</label>
            <h2 className='linkText'>Forgot password ?</h2>
          </div>

          <div className='loginButtonContainer'>
            <button className='loginButton'>Login</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
