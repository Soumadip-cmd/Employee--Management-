import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";

const EditAdmin = () => {
  const { id } = useParams();
  const { editAdmin, admin } = useContext(DataContext);
  const [edit_admin, setEdit_admin] = useState({ id: id, name: "", email: "" });
  const [file, setFile] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
      const adminData = admin.find((data) => data._id === id);
      if (adminData) {
            setEdit_admin({ id: adminData._id, name: adminData.name, email: adminData.email });
            setFile(adminData.photo.url)
            console.log(adminData)
      }
    }, [id, admin]);

  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  const handleChange = (e) => {
    setEdit_admin({ ...edit_admin, [e.target.name]: [e.target.value] });
  };

  const photoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const newUrl = reader.result;
      editAdmin(edit_admin.id, edit_admin.name, edit_admin.email, newUrl);
      setEdit_admin({ id: id, name: "", email: "" });
      setFile(null);
    };
    navigate('/manageAdmin')
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
              to="/"
            >
              Admin
            </NavLink>
            <div className="mt-2 pt-2">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink
                      to="/"
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
                    value={edit_admin.name}
                    onChange={handleChange}
                    style={{ border: "1px solid" }}
                    
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
                    value={edit_admin.email}
                    onChange={handleChange}
                    
                    style={{ border: "1px solid" }}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-danger float-end mx-1"
                    id="cancel"
                    // onClick={() => navigate('/manageAdmin')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary float-end mx-1"
                    id="submit"
                  >
                    Update
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

export default EditAdmin;
