import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/organism/Navbar";
import LogIn from "./components/organism/LogIn";
import SignUp from "./components/organism/SignUp";
import Welcome from "./components/views/Welcome";
import MapView from "./components/views/MapView";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { useLocalStorage } from "react-use";
import useBodyScroll from "./components/hooks/useBodyScroll";

function App() {
  const user = useLocalStorage("user");
  const userIsAuthorized = Boolean(user);




  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <div className="flex-grow h-screen bg-lw-50">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route element={<ProtectedRoute authorized={userIsAuthorized} redirectPath="/login" />}> {/* TAMBIEN PUEDO USAR redirectPath para llevar a otro lado */}
              <Route path="/map" element={<MapView />} />
            </Route>
          </Routes>
        </div>
        <div className="z-50 absolute bottom-0 w-full">
          <Navbar />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
