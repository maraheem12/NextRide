import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = {
        email,
        password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token); // Save token
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
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
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h2 className="pb-2 font-bold text-xl">Enter password</h2>
              <input
                className="bg-[#eeeeee] justify-center flex flex-col mb-4 font-bold px-10 py-2 border-y-indigo-400"
                type="password"
                placeholder="Password"
                required
                value={password}
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
                Don't have an account?
                <Link to="/userSignup" className="text-blue-500">
                  {" "}
                  create new{" "}
                </Link>
              </p>
            </form>
          </div>
          <div className="p-9">
            <Link
              to="/captainLogin"
              className="justify-center flex flex-col items-center bg-green-400 px-18 py-4 text-xl font-bold  text-white  rounded-md mb-3"
            >
              Sign in as Captain
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
