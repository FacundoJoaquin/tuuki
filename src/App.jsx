import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/organism/Navbar";
import LogIn from "./components/organism/LogIn";
import SignUp from "./components/organism/SignUp";
import Welcome from "./components/views/Welcome";
import MapView from "./components/views/MapView";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { useLocalStorage } from "react-use";

function App() {
  const user = useLocalStorage("user");
  const userIsAuthorized = Boolean(user);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-full absolute">
        <div className="flex-grow flex w-screen">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route
              element={
                <ProtectedRoute authorized={userIsAuthorized} redirectPath="/login" />
              }
            >
              <Route path="/map" element={<MapView />} />
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
