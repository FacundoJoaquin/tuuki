import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/organism/Navbar";
import LogIn from "./components/organism/LogIn";
import SignUp from "./components/organism/SignUp";
import Welcome from "./components/views/Welcome";
import MapView from "./components/views/MapView";
import UserProfile from "./components/views/UserProfile";
import Config from "./components/views/Config";
import PrivateRoutes from "./components/utils/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full absolute">
        <div className="flex-grow flex justify-center w-screen">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/map" element={<MapView />} />
              <Route path="/config" element={<Config />} />
              <Route path="/user" element={<UserProfile />} />
            </Route>
          </Routes>
        </div>
        <div className="h-12  relative bottom-0">
          <Navbar />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
