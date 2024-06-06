import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNavBar from "./screens/SideNavBar";
import ShowDetailsScreen from "./screens/ShowDetailScreen";
import NoPage from "./screens/NoPage";
import Home from "./screens/Home";
import ScreenLoader from "./screens/ScreenLoader";
import LoginPage from "./screens/login";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ScreenLoader/>}/>
      <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/SideNavBar" element={<SideNavBar />} />
        <Route path="/ShowDetail" element={<ShowDetailsScreen />} />
        <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  );
}
