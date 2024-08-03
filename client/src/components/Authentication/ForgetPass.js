import React, { useState } from "react";
import "./Special.css";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  // State to track email input and OTP input visibility
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle email input change
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // Validate email and update error state
    if (!emailPattern.test(inputValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const navigate=useNavigate()

  const handleSubmit=()=>{
      navigate('/')
  }

  // Function to handle the Send OTP button click
  const handleSendOTP = (e) => {
    e.preventDefault(); // Prevent form submission
    if (emailPattern.test(email)) {
      setShowOTP(true); // Show the OTP input and Submit button if email is valid
    }
  };

  return (
    <div
      className="stylishBG d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="form-container">
        <form className="form">
          <input
            type="email"
            className={`input ${emailError ? "input-error" : ""}`}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <span className="error-text">{emailError}</span>}

          <button
            className="form-btn"
            onClick={handleSendOTP}
            disabled={!email || emailError} // Disable button if email is invalid
          >
            Send OTP
          </button>

          {/* Conditionally render the OTP input and Submit button */}
          {showOTP && (
            <>
              <label htmlFor="otp">Verify OTP</label>
              <input
                type="number"
                className="input"
                placeholder="OTP"
                id="otp"
                required
              />
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </>
          )}
        </form>

        <div className="buttons-container"></div>
      </div>
    </div>
  );
};

export default ForgetPass;
