import React, { useContext, useState, useEffect } from "react";
import "../Leave/ApplyLeave.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";

export default function EditStaff() {
  const { id } = useParams();
  const { editStaff, staff } = useContext(DataContext);
  const [edit_staff, setEdit_staff] = useState({
    id: id,
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
  const [file, setFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const staffData = staff.find((data) => data._id === id);
    if (staffData) {
      setEdit_staff({
        id: staffData._id,
        name: staffData.name,
        gender: staffData.gender,
        phone: staffData.phone,
        dob: staffData.dob,
        city: staffData.city,
        country: staffData.country,
        department: staffData.department,
        email: staffData.email,
        date_of_join: staffData.date_of_join,
        state: staffData.state,
        address: staffData.address,
      });
      setPhotoUrl(staffData.photo.url);
    }
  }, [id, staff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoUrlToUse = photoUrl;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        photoUrlToUse = reader.result;

        await editStaff(
          edit_staff.id,
          edit_staff.name,
          edit_staff.gender,
          edit_staff.phone,
          edit_staff.dob,
          edit_staff.city,
          edit_staff.country,
          edit_staff.department,
          edit_staff.email,
          photoUrlToUse,
          edit_staff.date_of_join,
          edit_staff.state,
          edit_staff.address
        );

        setEdit_staff({
          id: id,
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
        setFile(null);
        navigate("/manageStaff");
      };
      reader.readAsDataURL(file);
    } else {
      // Use the existing photo URL if no new file is selected
      await editStaff(
        edit_staff.id,
        edit_staff.name,
        edit_staff.gender,
        edit_staff.phone,
        edit_staff.dob,
        edit_staff.city,
        edit_staff.country,
        edit_staff.department,
        edit_staff.email,
        photoUrlToUse,
        edit_staff.date_of_join,
        edit_staff.state,
        edit_staff.address
      );

      setEdit_staff({
        id: id,
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
      navigate("/manageStaff");
    }
  };

  const handleChange = (e) => {
    setEdit_staff({ ...edit_staff, [e.target.name]: e.target.value });
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
                  Edit
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
                  value={edit_staff.name}
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
                  value={edit_staff.gender}
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
                  value={edit_staff.phone}
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
                  value={edit_staff.dob}
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
                  value={edit_staff.city}
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
                  value={edit_staff.country}
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
                  value={edit_staff.department}
                  style={{ border: "1px solid" }}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
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
                  value={edit_staff.email}
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
                 
                  style={{ border: "1px solid" }}
                />
              </div>
              <div className="mt-2">
                <img
                  src={file ? URL.createObjectURL(file) : photoUrl}
                  alt="Admin"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
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
                  value={edit_staff.date_of_join}
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
                  value={edit_staff.state}
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
                  value={edit_staff.address}
                  placeholder="Description"
                  style={{ border: "1px solid" }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success float-end"
                id="applyleave"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
