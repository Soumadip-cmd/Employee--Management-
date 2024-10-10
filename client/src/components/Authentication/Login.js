import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import toast from "react-hot-toast";
import DataContext from "../../context/DataContext";
import LoginLoading from "../Loading/LoginLoading";

const Login = () => {
  const { loginProfile } = useContext(DataContext);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); 
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false); 

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    await loginProfile(login.email, login.password, navigate); 
    setIsLoading(false); 
  };

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value }); 
  };

  const handleRequestToAdmin = async () => {
    setIsRequestLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    setIsRequestLoading(false); 
    setRequestSuccess(true); 
     toast.success("Request sent successfully!");
  };

  const facebook = () => {
    const url = "https://employee-management-qwn3.onrender.com/auth/facebook";
    // const url = 'http://localhost:8800/auth/facebook';
    window.open(url, "_self");
  };

  const google = () => {
    const url = "https://employee-management-qwn3.onrender.com/auth/google";
    //  const url = 'http://localhost:8800/auth/google';
    window.open(url, "_self");
  };

  return (
    <div
      className="stylishBG d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={handleChange}
            required
          />
          <p className="page-link">
            <NavLink className="page-link-label" to='/forgetPass'>Forgot Password?</NavLink>
          </p>

          {/* Conditionally render LoginLoading if isLoading is true */}
          {isLoading ? (
            <LoginLoading />
          ) : (
            <button className="form-btn">Log in</button>
          )}
        </form>
        <p className="sign-up-label">
          Don't have an account?
          <span 
            className="sign-up-link"
            onClick={handleRequestToAdmin}
            style={{ cursor: "pointer" }}
          >
            {isRequestLoading ? (
              <span>Sending...</span> // Show loading text while sending request
            ) : requestSuccess ? (
              <span>✓ Sent Successfully</span> // Show success message
            ) : (
              "Send Request to Admin" // Default button text
            )}
          </span>
        </p>
        <div className="buttons-container">
          <div className="apple-login-button mx-1" onClick={facebook}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
            <span>Log in with Facebook</span>
          </div>
          <div className="google-login-button" onClick={google}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              x="0px"
              y="0px"
              className="google-icon"
              viewBox="0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Log in with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
