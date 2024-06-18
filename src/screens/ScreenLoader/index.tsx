import { useEffect, useState } from 'react';
import './style.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';

const ScreenLoader = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  console.log("TT01 ScreenLoaderScreenLoader function calling");

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in successfully");
        navigate("/SideNavBar");

      } else {
        console.log("TT01 userloggin failed");
        navigate("/home");

      }
    });

    return () => subscriber(); // unsubscribe on unmount
  }, []);

  return (
    <>
      <Loader/>
    </>
  );
};

export default ScreenLoader;
