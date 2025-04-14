import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setCaptain, setError: setContextError } =
    React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setContextError(null);

    try {
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: parseInt(vehicleCapacity),
          vehicleType,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201 && response.data) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captainDashboard");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      setContextError(errorMessage);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[375px] h-[667px] flex flex-col justify-between border border-slate-950 bg-center bg-cover bg-bottom shadow-lg rounded-lg overflow-hidden">
        <div className="justify-between flex flex-col h-screen">
          <div className="p-4 m-2 mr-6">
            <img src={logo} alt="NextRide Logo" className="w-40 pb-9" />
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <form onSubmit={submitHandler}>
              <h3 className="pb-2 font-bold text-xl">Enter your name</h3>
              <div className="flex gap-2">
                <input
                  className="bg-[#eeeeee] placeholder:text-sm justify-center items-center mb-4 font-bold px-5 py-2 w-1/2 border-y-indigo-400"
                  type="text"
                  placeholder="Firstname"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="bg-[#eeeeee] placeholder:text-sm justify-center items-center mb-4 font-bold px-5 py-2 w-1/2 border-y-indigo-400"
                  type="text"
                  placeholder="Lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <h2 className="pb-2 font-bold text-xl">Enter email</h2>
              <input
                className="bg-[#eeeeee] justify-center flex flex-col items-center mb-4 font-bold px-5 py-2 border-y-indigo-400"
                type="email"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h2 className="pb-2 font-bold text-xl">Enter password</h2>
              <input
                className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border mb-4 text-lg placeholder:text-base"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <h3 className="font-bold text-xl mb-2">Vehicle Information</h3>
              <div className="flex gap-4 mb-7">
                <input
                  required
                  className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                  type="text"
                  placeholder="Vehicle Color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input
                  required
                  className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                  type="text"
                  placeholder="Vehicle Plate"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </div>
              <div className="flex gap-4 mb-7">
                <input
                  required
                  className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                  type="number"
                  placeholder="Vehicle Capacity"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />
                <select
                  required
                  className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>

              <button
                className="justify-center items-center bg-black px-16 py-2 text-xl
                 font-bold text-white rounded-md whitespace-nowrap mb-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register as Captain"}
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
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
