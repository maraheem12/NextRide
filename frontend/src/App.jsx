import React from "react";
import { Routes, Route } from "react-router-dom";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import UserLogout from "./pages/userLogout";
import CaptainLogin from "./pages/CaptainLogin";
import Start from "./pages/Start";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainDashboard from "./pages/CaptainDashboard";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/captainSignup" element={<CaptainSignup />} />
        <Route path="/captainLogin" element={<CaptainLogin />} />
        <Route
          path="/captainDashboard"
          element={
            <CaptainProtectWrapper>
              <CaptainDashboard />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/users/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captains/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
