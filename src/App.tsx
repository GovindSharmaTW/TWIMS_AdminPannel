import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/login";
import HomePage from "./screens/Home";
import ErrorPage from "./screens/ErrorPage";
import AboutPage from "./screens/About";
import SideNavBar from "./screens/SideNavBar";
import AssignInventoryScreen from "./screens/AssignInventoryScreen";

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="/Login" element={<LoginPage />} />
    //       <Route path="/About" element={<AboutPage />} />
    //       {/* <Route path="*" element={<ErrorPage />} /> */}
    //   </Routes>
    // </BrowserRouter>
    <SideNavBar/>
    // <AssignInventoryScreen/>
    // <LoginPage/>  
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);