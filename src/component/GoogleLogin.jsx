import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig/config"; 

const GoogleLogin = ({ login }) => {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In Success:", user);
      login(user);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
