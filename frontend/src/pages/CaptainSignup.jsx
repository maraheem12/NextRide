import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState } from "react";
import Footer from "../components/Footer";

const CaptainSignup = () => {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        email: email,
        password: password,
        fullName:{
          firstName: firstName,
          lastName: lastName
        }
       
      })
      console.log(userData)
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
  
    }
  return (
    <div className="justify-between flex flex-col h-screen">
      <div className="p-4 m-2 mr-6">
        <img src={logo} alt="NextRide Logo" className="w-40 pb-9" />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="pb-2 font-bold text-xl">Enter your name</h3>
          <div className="flex gap-2">
            <input
              className="bg-[#eeeeee] placeholder:text-sm  justify-centeritems-center mb-4 font-bold px-5 py-2 w-1/2  border-y-indigo-400"
              type="text"
              placeholder="Firstname"
              required
              value={firstName}
              onChange={(e) => {
                 setFirstName(e.target.value);
              }}
            />
            <input
              className="bg-[#eeeeee] placeholder:text-sm justify-center items-center mb-4 font-bold px-5 py-2 w-1/2  border-y-indigo-400"
              type="text"
              placeholder="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h2 className="pb-2 font-bold text-xl">Enter email</h2>
          <input
            className="bg-[#eeeeee] justify-center lex flex-col items-center mb-4 font-bold px-5 py-2  border-y-indigo-400"
            type="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h2 className="pb-2 font-bold text-xl">Enter password</h2>
          <input
            className="bg-[#eeeeee] justify-center flex flex-col mb-4 font-bold px-5 py-2 border-y-indigo-400"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <button
            className="justify-center items-center bg-black px-16 py-4 
            text-xl font-bold text-white rounded-md whitespace-nowrap mb-3"
            type="submit"
          >
            Register as Captain
          </button>
          <p className="text-black">
            Already have an account?
            <Link to="/captainLogin" className="text-blue-500">
              {" "}
              login here{" "}
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CaptainSignup;
