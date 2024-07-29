import React,{useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const camera=useRef(null)

  const handleCamera=()=>{
    camera.current.click()
  }

  const navigate=useNavigate()
  useEffect(() => {
    if(!(localStorage.getItem('authToken')))
    {
      navigate('/')
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div
        className=" d-flex justify-content-center align-items-center flex-column "
        style={{ height: "100vh" }}
      >
        <div className="form-container p-3 p-md-4 mt-5">
          <div className=" bg-light p-lg-4 p-2 rounded shadow-sm">
            <h2 className="h4 mb-3">Profile</h2>
            <p className="text-muted">You can update the details:</p>
            <hr className=" border-1 border-black" />
            <div className="text-center mb-4 position-relative">
              <img
                src="https://placehold.co/100x100"
                alt="User Profile"
                className="rounded-circle mb-3 "
              />
              <span
                className="rounded-circle p-2 d-flex justify-content-center align-items-center bg-opacity-50  bg-secondary position-absolute"
                style={{ width: "fit-content", bottom: "18px", right: "50%",transform:'translateX(51px)' }} onClick={handleCamera}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-camera-fill "
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                </svg>

              </span>
                <input type="file" ref={camera} className=" d-none" accept="image/jpeg, image/png, image/webp, image/svg+xml"  />
            </div>

            <form action="" className=" form-control">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Soumadip Santra"
                />
                <label for="floatingInput">Full Name</label>
              </div>
              
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>
            </form>

            <p className="mt-4 text-center text-muted d-grid">
              <button type="button" className="btn btn-success">
                Update Details
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
