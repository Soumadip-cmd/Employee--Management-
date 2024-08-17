import React, { useState } from "react";
import "./login.css";
import toast from "react-hot-toast";
import LoadingSub from "../Loading/LoadingSub"; // Make sure to import the LoadingSub component

const ForgetPass = () => {
  // State to track email input, error message, and loading status
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const link = process.env.REACT_APP_BACKEND_URL || "http://localhost:8800";
      const url = `${link}/forget-password`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      toast.success("Email Sent Successfully..");
    } catch (error) {
      console.error("There was an error with the request:", error);
      toast.error("Email Failed to send");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    if (!emailPattern.test(inputValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <div
      className="stylishBG d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            className={`input ${emailError ? "input-error" : ""}`}
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          {emailError && <span className="error-text">{emailError}</span>}

          {loading ? (
            <LoadingSub btnName="Sending..." color="primary" />
          ) : (
            <button
              type="submit"
              className="form-btn"
              disabled={!email || emailError}
            >
              Send Email
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
