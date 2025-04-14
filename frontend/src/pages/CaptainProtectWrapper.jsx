import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/captainLogin");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCaptain(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        navigate("/captainLogin");
      }
    };

    verifyToken();
  }, [token, navigate, setCaptain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
