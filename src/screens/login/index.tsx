import React, { useState } from 'react';
import './styles.css'
import { Label } from '@mui/icons-material';
import { Checkbox, Input } from '@mui/material';

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
  // console.log("email  and password is",email,password);
  console.log("all entry data is", allEntry);

  return (
    // <div>
    //   <h2>Login Page</h2>
    //   <input
    //     type="text"
    //     placeholder="Username"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //   />
    //   <br />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <br />
    //   <button onClick={handleLogin}>Login</button>
    // </div>
    // <>
    <div className='LoginContainer'>
      <form action="" onSubmit={submitForm}>
        <div className='baseContainer'>
          <div>
            <label>Email</label>
            <div className="inputBoxStyle">
              <input type="text" name='email' id='email' required onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email'/>
            </div>
          </div>

          <div className='inputBoxContainer'>
            <label>Password</label>
            <div className="inputBoxStyle">
              <input type='password' id='password' required onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
            </div>
          </div>

          <div className='linkContainer'>
            <label><Input type='checkBox'/> Remember me</label>

            <label>Forgot Password ?</label>

          </div>

          <div className='buttonContainer'>
          <button type='submit' className='buttonStyle'>Login</button>
            
          </div>

        </div>
      </form>
    </div>
  );
};

export default LoginPage;
