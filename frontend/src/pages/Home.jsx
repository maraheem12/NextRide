import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";


const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[375px] h-[667px] flex flex-col justify-between border border-slate-950 bg-center bg-cover bg-bottom shadow-lg rounded-lg overflow-hidden">
        <div className="h-screen relative overflow-hidden bg-white">
          {/* Logo */}
          <div className="p-4">
            <img
              className="w-40 pb-9"
              src={logo}
              //alt="NextRide"
            />
          </div>

          {/* Map or content area */}
          <div className="flex-1 bg-gray-200 h-full"></div>

          {/* Find Trip Section - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg">
            <div className="px-4 py-6">
              <h4 className="text-xl font-medium mb-4">Find a trip</h4>
              <form onSubmit={submitHandler}>
                <div className="relative">
                  {/* Vertical line connector */}
                  <div className="absolute left-4 top-[28px] h-12 w-[2px] bg-gray-300"></div>

                  {/* Pickup input */}
                  <div className="relative mb-2">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg"
                      type="text"
                      placeholder="Add a pick-up location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>

                  {/* Destination input */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black"></div>
                    <input
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg"
                      type="text"
                      placeholder="Enter your destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>

                {/* Find Trip Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg mt-4 font-medium text-lg"
                >
                  Find Trip
                </button>
              </form>
            </div>
          </div>

          {/* Rest of the panels */}
          <div ref={panelRef} className="bg-white h-0"></div>
          <div
            ref={vehiclePanelRef}
            className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
          ></div>
          <div
            ref={confirmRidePanelRef}
            className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
          ></div>
          <div
            ref={vehicleFoundRef}
            className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
          >
            <div
              ref={waitingForDriverRef}
              className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
