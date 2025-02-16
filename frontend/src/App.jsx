import React from 'react';
import {Routes, Route} from 'react-router-dom';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import Start from './pages/Start';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="captainSignup" element={<CaptainSignup />} />
        <Route path="captainLogin" element={<CaptainLogin />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
