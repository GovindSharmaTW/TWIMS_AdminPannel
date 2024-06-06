import { useState } from 'react';
import styles from './styles.module.css'
import inventory from '../../assets/images/inventory.jpg'
import { signInUser } from '../../firebase';
import { checkIsEmpty } from '../../utils';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  console.log("TT01 LoginPage called");

  const navigate = useNavigate();


  const handleSignIn = () => {

    if (!checkIsEmpty(email) && !checkIsEmpty(password)) {
      signInUser(email, password).then((res) => {

        if (res) {
          navigate('/SideNavBar');
        }
      });
    }
    else {
      toast.error('Please enter valid email and password');
      setEmail('');
      setPassword('');
    }
  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.baseContainer}>
      <div className={styles.primaryContainer}>
        <div style={{ width: "100%", height: "100%" }}>
          <img src={inventory} alt="" style={{ height: "100%" }} />
        </div>
      </div>

      <div className={styles.secondaryContainer}>
        <div className={styles.mainDiv} >
          <div className={styles.headingContainer}>
            <p className={styles.headingStyle}>Log in to your account</p>
            <p className={styles.subHeadingStyle}>Welcome back! Please enter your details.</p>
          </div>

          <div className={styles.inputContainerStyle}>
            <label className={styles.inputLabel}>Email</label>
            <input type="text" placeholder='Enter your email' className={styles.inputStyle} onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className={styles.inputContainerStyle}>
            <label className={styles.inputLabel}>Password</label>
            <div className={styles.inputStyle}>
              <input type={showPassword ? "text" : "password"} placeholder='Enter your password' className={styles.inputSecStyle} onChange={(e) => setPassword(e.target.value)} value={password} />
              <button onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon className={styles.eyeIconStyle} /> : <RemoveRedEyeIcon className={styles.eyeIconStyle} />}
              </button>
            </div>
          </div>

          <div className={styles.textContainer} >
            <label className={styles.inputLabel}><input type="checkbox" className={styles.checkBoxStyle} />Remember</label>
            <h2 className={styles.linkText}>Forgot password ?</h2>
          </div>

          <div className={styles.loginButtonContainer}>
            <button className={styles.loginButton} onClick={handleSignIn}>Login</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
