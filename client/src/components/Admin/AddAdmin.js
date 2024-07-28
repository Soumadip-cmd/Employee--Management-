import React from "react";
import { NavLink } from "react-router-dom";
const AddAdmin = () => {
  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}
      >
        <div className="container mt-5">
          <NavLink
            className="navbar-brand"
            style={{
              fontSize: "25px",
              color: "white",
              letterSpacing: ".05125em",
            }}
            to="/"
          >
            Admin
          </NavLink>

          <div className=" mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink
                    to="/"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    Home
                  </NavLink>
                </li>
                <li
                  className="breadcrumb-item active fw-semibold text-decoration-underline"
                  aria-current="page"
                >
                  Add
                </li>
                <li className="breadcrumb-item">
                  <NavLink
                    to="/manageAdmin"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    ManageAdmin
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="container my-2 pt-3">
        <h2>Admin Management</h2>
      </div>
      <div className=" mb-4 pt-3  extra-special">
        <div className="row d-flex justify-content-evenly  " style={boxstyle}>
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Add Admin
          </h5>
          <hr />
          <form action="" onSubmit={handleSubmit}>
          <div className="col-12">
            <div className="mb-3">
              <b>Admin Name</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                className="form-control"
                id="user_id"
                name="user_id"
                
                style={{ border: "1px solid" }}
                required
              />
            </div>
            <div className="mb-3">
              <b>Admin Photo</b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="file"
                className="form-control"
                
                required
                
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="mb-3">
              <b>Admin Email </b>
              <span style={{ color: "red" }}>*</span>
              <input
                type="email"
                className="form-control"
                id="reason"
                name="reason"
                
                required
                style={{ border: "1px solid" }}
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="btn btn-outline-danger float-end mx-1"
                id="applyleave"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary float-end mx-1"
                id="applyleave"
              >
                Submit
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
