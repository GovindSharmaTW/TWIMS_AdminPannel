import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "../screens/NoPage";
import Home from "../screens/Home";
import LoginPage from "../screens/login";
import SideNavBar from "../screens/SideNavBar";
import ShowDetailsScreen from "../screens/ShowDetailScreen";
import ScreenLoader from "../screens/ScreenLoader";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScreenLoader/>}/>
          <Route path="/login" element={<Home/>} />
          <Route path="/SideNabBar" element={<SideNavBar />} />
          <Route path="/ShowDetail" element={<ShowDetailsScreen />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router />);