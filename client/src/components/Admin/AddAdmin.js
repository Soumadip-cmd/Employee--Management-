import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";

const AddAdmin = () => {
  const { addAdmin } = useContext(DataContext);
  const [add_admin, setAdd_admin] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file && add_admin.name && add_admin.email) {
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const photoURL = reader.result;
      
        await addAdmin(add_admin.name,add_admin.email,photoURL);

        setAdd_admin({ name: "", email: "" });
        setFile(" ");
        
      };
    } else {
      console.error("All fields are required, including a valid photo file.");
    }
  };

  const handleChange = (e) => {
    setAdd_admin({ ...add_admin, [e.target.name]: e.target.value });
  };

  const photoChange = (e) => {
    setFile(e.target.files[0]);
  };

  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  return (
    <>
      {/* Your navigation and form UI code */}
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
            to="/dashboard"
          >
            Admin
          </NavLink>
          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink
                    to="/dashboard"
                    className="text-dark fw-semibold text-decoration-none"
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
                    className="text-dark fw-semibold text-decoration-none"
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
      <div className="mb-4 pt-3 extra-special">
        <div className="row d-flex justify-content-evenly" style={boxstyle}>
          <h5 style={{ fontSize: "20px" }} className="px-2">
            Add Admin
          </h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="col-12">
              <div className="mb-3">
                <b>Admin Name</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={add_admin.name}
                  onChange={handleChange}
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
                  name="photo"
                  accept=".jpg, .png, .svg, .webp, .jpeg"
                  onChange={photoChange}
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
                  name="email"
                  value={add_admin.email}
                  onChange={handleChange}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger float-end mx-1"
                  id="cancel"
                  onClick={() => navigate('/manageAdmin')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary float-end mx-1"
                  id="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
    </>
  );
};

export default AddAdmin;
