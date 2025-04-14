import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );

      if (response.status === 200 && response.data) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captainDashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

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
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}
              <button
                className="justify-center font-bold flex flex-col bg-black text-white px-32 py-3 rounded-md mb-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
};

export default CaptainLogin;
