import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/userLogin");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        navigate("/userLogin");
      }
    };

    verifyToken();
  }, [token, navigate, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
