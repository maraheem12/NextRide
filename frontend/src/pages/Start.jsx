import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";



const Start = () => {
  return (
      <div className ="">
        <div className="pt-8 h-screen w-full flex justify-between flex-col bg-red-300 bg-center
        bg-[url(https://images.stockcake.com/public/7/f/3/7f3801ab-36b2-459a-9ef8-d86c65bb7d57_large/rainy-traffic-lights-stockcake.jpg)] bg-cover bg-bottom">
          <img src={logo} alt="NextRide Logo" className="w-60 " />
          <div className="bg-white text-2xl p-5 ">
             <h1 className="font-extrabold p-3">Get Started with NextRide</h1>
             <Link to="/userLogin" className="bg-black font-extrabold text-white flex p-5 justify-center items-center rounded-lg">Continue</Link>
          </div>
        </div>
    </div>
  );
};

export default Start;
//img src={logo} alt="NextRide Logo" className="w-48" />