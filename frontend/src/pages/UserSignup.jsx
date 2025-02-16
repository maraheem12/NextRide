import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  //const userContextValue = React.useContext(UserContext);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
    };
    // console.log(import.meta.env.VITE_BASE_URL); // Debugging
    // console.log(`${import.meta.env.VITE_BASE_URL}/register`);
 
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/register`, // Ensure correct base URL and endpoint
        newUser
      );
      console.log(response.data);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        navigate("/home");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };
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
              value={firstname}
              placeholder="Firstname"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] placeholder:text-sm justify-center items-center mb-4 font-bold px-5 py-2 w-1/2  border-y-indigo-400"
              type="text"
              value={lastname}
              placeholder="Lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h2 className="pb-2 font-bold text-xl">Enter email</h2>
          <input
            className="bg-[#eeeeee] justify-center lex flex-col items-center mb-4 font-bold px-5 py-2  border-y-indigo-400"
            type="email"
            value={email}
            placeholder="example@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <h2 className="pb-2 font-bold text-xl">Enter password</h2>
          <input
            className="bg-[#eeeeee] justify-center flex flex-col mb-4 font-bold px-5 py-2 border-y-indigo-400"
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
            Register
          </button>
          <p className="text-black">
            Already have an account?
            <Link to="/userLogin" className="text-blue-500">
              {" "}
              login here{" "}
            </Link>
          </p>
        </form>
      </div>
      <div className="px-4">
        <Link
          to="/captainSignup"
          className="justify-center flex flex-col items-center bg-[#d5622d] px-18 py-4 text-xl font-bold  text-white  rounded-md mb-3"
        >
          Register as Captain
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default UserSignup;
