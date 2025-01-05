import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig/config";
import { signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navigate("/login");
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    };
    handleLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-lg font-semibold text-gray-700">Logging out...</h2>
    </div>
  );
};

export default Logout;
