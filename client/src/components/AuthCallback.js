// src/components/AuthCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/dashboard"); // Redirect to home or another page
      } else {
        // Handle error or redirect to the login page
        navigate("/");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
