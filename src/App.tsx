import ReactDOM from "react-dom/client";
import LoginPage from "./screens/login";
import SideNavBar from "./screens/SideNavBar";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {

  const auth = getAuth();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {

      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      {
        isUserLoggedIn
          ?
          <SideNavBar />

          :
          <LoginPage />
      }
    </>


  );
}