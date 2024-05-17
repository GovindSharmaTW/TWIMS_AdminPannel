import { useState } from 'react';
import './styles.css'
import inventory from '../../assets/images/inventory.jpg'
import { signInUser } from '../../firebase';
import { checkIsEmpty } from '../../utils';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSignIn = () => {

    if (!checkIsEmpty(email) && !checkIsEmpty(password)) {
      signInUser(email, password);
    }
    else {
      alert('Please enter valid email and password');
      setEmail('');
      setPassword('');
    }
  }

  return (
    <div className='baseContainer'>
      <div className='primaryContainer'>
        <img src={inventory} alt="" className="imageStyle" />
      </div>

      <div className='secondaryContainer'>
        <div className='mainDiv' >
          <div className='headingContainer'>
            <p className='headingStyle'>Log in to your account</p>
            <p className='subHeadingStyle'>Welcome back! Please enter your details.</p>
          </div>

          <div className='inputContainer'>
            <label className='inputLabel'>Email</label>
            <input type="text" placeholder='Enter your email' className='inputStyle' onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className='inputContainer'>
            <label className='inputLabel'>Password</label>
            <input type="text" placeholder='Enter your password' className='inputStyle' onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          <div className='textContainer' >
            <label className='inputLabel'><input type="checkbox" className='checkBoxStyle' />Remember</label>
            <h2 className='linkText'>Forgot password ?</h2>
          </div>

          <div className='loginButtonContainer'>
            <button className='loginButton' onClick={handleSignIn}>Login</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
