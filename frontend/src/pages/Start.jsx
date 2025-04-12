
import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[375px] h-[667px] flex flex-col justify-between bg-red-300 border border-slate-950 bg-center bg-[url(https://images.stockcake.com/public/7/f/3/7f3801ab-36b2-459a-9ef8-d86c65bb7d57_large/rainy-traffic-lights-stockcake.jpg)] bg-cover bg-bottom shadow-lg rounded-lg overflow-hidden">
        <div className="p-5">
          <img src={logo} alt="NextRide Logo" className="w-40" />
        </div>
        <div className="bg-white text-2xl p-5">
          <h1 className="font-extrabold p-3">Get Started with NextRide</h1>
          <Link to="/userLogin" className="bg-black font-extrabold text-white flex p-5 justify-center items-center rounded-lg">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
