import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Footer from "../components/Footer";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/register`,
        newUser
      );
      console.log(response.data);
      if (response.status === 201) {
        setUser(response.data.user);
        navigate("/home");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      alert("Failed to register. Please try again.");
      console.error("Error during registration:", error);
    }

    // Reset input fields after successful submission
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[375px] h-[667px] flex flex-col justify-between bg-while bg-center border border-slate-950">
        <div className="p-5">
          <div className="p-4 m-2">
            <img src={logo} alt="NextRide Logo" className="w-40 pb-9" />
            <form onSubmit={submitHandler}>
              <h3 className="pb-2 font-bold text-xl">Enter your name</h3>
              <div className="flex gap-2">
                <input
                  className="bg-[#eeeeee] placeholder:text-sm mb-4 font-bold px-5 py-2 w-1/2 border-y-indigo-400"
                  type="text"
                  value={firstname}
                  placeholder="Firstname"
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                  className="bg-[#eeeeee] placeholder:text-sm mb-4 font-bold px-5 py-2 w-1/2 border-y-indigo-400"
                  type="text"
                  value={lastname}
                  placeholder="Lastname"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <h2 className="pb-2 font-bold text-xl">Enter email</h2>
              <input
                className="bg-[#eeeeee] mb-4 font-bold px-5 py-2 border-y-indigo-400"
                type="email"
                value={email}
                placeholder="example@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <h2 className="pb-2 font-bold text-xl">Enter password</h2>
              <input
                className="bg-[#eeeeee] mb-4 font-bold px-5 py-2 border-y-indigo-400"
                type="password"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                className="font-bold bg-black text-white px-32 py-3 rounded-md mb-3"
                type="submit"
              >
                Register
              </button>
              <p className="text-black">
                Already have an account?
                <Link to="/userLogin" className="text-blue-500">
                  {" "}login here{" "}
                </Link>
              </p>
            </form>
          </div>
          <div className="px-4">
            <Link
              to="/captainSignup"
              className="bg-[#d5622d] px-18 py-4 text-xl font-bold text-white rounded-md mb-3 flex justify-center"
            >
              Register as Captain
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
