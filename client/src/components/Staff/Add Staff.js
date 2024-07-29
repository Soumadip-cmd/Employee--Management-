import React, { useContext, useState } from "react";
import "../Leave/ApplyLeave.css";
import { NavLink } from "react-router-dom";
import DataContext from "../../context/DataContext";

export default function AddStaff() {
  const { addStaff } = useContext(DataContext);
  const [add_staff, setAdd_staff] = useState({
    name: "",
    gender: "",
    phone: "",
    dob: "",
    city: "",
    country: "",
    department: "",
    email: "",
    date_of_join: "",
    state: "",
    address: "",
  });
  const [file,setFile]=useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file &&  add_staff.name &&
      add_staff.gender &&
      add_staff.phone &&
      add_staff.dob &&
      add_staff.city &&
      add_staff.country &&
      add_staff.department &&
      add_staff.email &&
      add_staff.date_of_join &&
      add_staff.state &&
      add_staff.address) {
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const photoURL = reader.result;
      
        await addStaff(add_staff.name,
          add_staff.gender,
          add_staff.phone,
          add_staff.dob,
          add_staff.city,
          add_staff.country,
          add_staff.department,
          add_staff.email,
          photoURL,
          add_staff.date_of_join,
          add_staff.state,
          add_staff.address,);

        setAdd_staff({
          name: "",
          gender: "",
          phone: "",
          dob: "",
          city: "",
          country: "",
          department: "",
          email: "",
          date_of_join: "",
          state: "",
          address: "",
        });
        setFile(" ");
        
      };
    } else {
      console.error("All fields are required, including a valid photo file.");
    }
  };

  const handleChange = (e) => {
    setAdd_staff({ ...add_staff, [e.target.name]:[ e.target.value] });
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
            Staff
          </NavLink>

          <div className=" mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink
                    to="/dashboard"
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
                    to="/manageStaff"
                    className=" text-dark fw-semibold text-decoration-none"
                  >
                    ManageStaff
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="container my-2 pt-3">
        <h2>Staff Management</h2>
      </div>
      <div className=" mb-4 pt-3  extra-special">
        <form action="" onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-evenly  " style={boxstyle}>
            <h5 style={{ fontSize: "20px" }} className="px-2">
              Add Staff
            </h5>
            <hr />
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <b className="">Full Name</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="name"
                  value={add_staff.name}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>

              <div className="mb-3">
                <b className="">Gender</b>
                <span style={{ color: "red" }}>*</span>
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="gender"
                  value={add_staff.gender}
                  style={{ border: "1px solid" }}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    --Select--
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="mb-3">
                <b>Mobile</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="tel"
                  max={10}
                  required
                  className="form-control"
                  onChange={handleChange}
                  name="phone"
                  value={add_staff.phone}
                  style={{ border: "1px solid" }}
                />
              </div>

              <div className="mb-3">
                <b>Date of Birth</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                  name="dob"
                  value={add_staff.dob}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>

              <div className="mb-3">
                <b>City</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="city"
                  value={add_staff.city}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>

              <div className="mb-3">
                <b>Country</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="country"
                  value={add_staff.country}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <b className="">Department</b>
                <span style={{ color: "red" }}>*</span>
                <select
                  className="form-control"
                  onChange={handleChange}
                  name="department"
                  value={add_staff.department}
                  style={{ border: "1px solid" }}
                  defaultValue=""
                  required
                >
                  <option
                   value="" disabled
                  >
                    --Department Name--
                  </option>
                  <option>Backend developement</option>
                  <option>Designing</option>
                  <option>Front-end developement</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                </select>
              </div>
              <div className="mb-3">
                <b>Email</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                  name="email"
                  value={add_staff.email}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <div className="mb-3">
                <b>Your Photo</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="file"
                  accept=".jpg, .png, .svg, .webp, .jpeg"
                  className="form-control"
                  onChange={photoChange}
                  
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <div className="mb-3">
                <b>Date of Joining</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="date"
                  className="form-control"
                  onChange={handleChange}
                  name="date_of_join"
                  value={add_staff.date_of_join}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <div className="mb-3">
                <b>State</b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="state"
                  value={add_staff.state}
                  required
                  style={{ border: "1px solid" }}
                />
              </div>
              <div className="mb-3">
                <b>Address</b>
                <span style={{ color: "red" }}>*</span>
                <textarea
                  className="form-control"
                  onChange={handleChange}
                  name="address"
                  value={add_staff.address}
                  placeholder="Description"
                  style={{ border: "1px solid" }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary float-end"
                id="applyleave"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
