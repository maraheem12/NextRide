import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useState } from 'react'

const CaptainLogin = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [captainData, setcaptainData] = useState({});
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setcaptainData({
          email: email,
          password: password
        })
        setEmail('');
        setPassword('');
      }
  return (
    
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="w-[375px] h-[667px] flex flex-col justify-between border border-slate-950 bg-center bg-cover bg-bottom shadow-lg rounded-lg overflow-hidden">
    <div className="justify-between flex flex-col h-screen">
      <div className="p-9">
        <img src={logo} alt="NextRide Logo" className="w-60 pb-9" />
        <form onSubmit={(e) => handleSubmit(e)}> 
          <h2 className="pb-2 font-bold text-xl">Enter email</h2>
          <input
            className="bg-[#eeeeee] justify-center lex flex-col items-center mb-4 font-bold px-10 py-2  border-y-indigo-400"
            type="email"
            value={email}
            placeholder="example@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <h2 className="pb-2 font-bold text-xl">Enter password</h2>
          <input
            className="bg-[#eeeeee] justify-center flex flex-col mb-4 font-bold px-10 py-2 border-y-indigo-400"
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <button
            className="justify-center font-bold flex flex-col bg-black text-white px-32 py-3 rounded-md mb-3"
            type="submit"
          >
            Login
          </button>
          <p className="text-black">
            Join us
            <Link to="/captainSignup" className="text-blue-500">
              {" "}
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div className="p-9">
        <Link
          to="/userLogin"
          className="justify-center flex flex-col items-center bg-[#d5622d] px-18 py-4 text-xl font-bold  text-white  rounded-md mb-3"
        >
          Sign in as User
        </Link>
      </div>
    </div>
    </div>
</div>
  );
}

export default CaptainLogin




