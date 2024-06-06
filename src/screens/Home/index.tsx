import './style.css';
import { useNavigate } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const handleNavigation = (type: string) => {
    console.log("home component handleNavigation calling", type);

    navigate('/login');
  }

  return (
    <div className='baseContainerhome'>
      <div>
        <nav>
          <h2 className='logo'>Thoughtwin</h2>
          <div className="nav-container-web" >
            <ul>
              <li><button onClick={() => handleNavigation('login')}>Login</button></li>
              <li><button onClick={() => handleNavigation('about')}>About</button></li>
              <li><button onClick={() => handleNavigation('contactUs')}>Contact Us</button></li>
            </ul>
          </div>

          <div className="nav-container" style={{ display: toggle ? "" : "none" }}>
            <span className="closeIcon" onClick={() => { setToggle(!toggle) }} >
              <CloseOutlinedIcon />
            </span>
            <ul>
              <li><button onClick={() => handleNavigation('login')}>Login</button></li>
              <li><button onClick={() => handleNavigation('about')}>About</button></li>
              <li><button onClick={() => handleNavigation('contactUs')}>Contact Us</button></li>
            </ul>
          </div>


          <span className='menuIcon' onClick={() => { setToggle(!toggle) }} style={{ display: toggle ? "none" : "" }}>
            <MenuOutlinedIcon />
          </span>
        </nav>
      </div>
    </div>
  )
};

export default Home;