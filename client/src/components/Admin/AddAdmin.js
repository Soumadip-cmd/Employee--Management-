import React, { useContext, useState ,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingSub from "../Loading/LoadingSub";

const AddAdmin = () => {
  const { addAdmin } = useContext(DataContext);
  const [add_admin, setAdd_admin] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (file && add_admin.name && add_admin.email && add_admin.password) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const photoURL = reader.result;
          await addAdmin(add_admin.name, add_admin.email, add_admin.password, photoURL);
          setAdd_admin({ name: "", email: "", password: "" });
          setFile(null);
          navigate('/manageAdmin'); // Redirect after successful submission
        } catch (error) {
          console.error("Error adding admin:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      };
    } else {
      console.error("All fields are required, including a valid photo file.");
      setLoading(false); // Stop loading in case of error
    }
  };

  const handleChange = (e) => {
    setAdd_admin({ ...add_admin, [e.target.name]: e.target.value });
  };

  const photoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
  };

  useEffect(() => {
    if(!(localStorage.getItem('authToken')))
    {
      navigate('/')
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}>
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
              <div className="mb-3 position-relative">
                <b>Admin Password </b>
                <span style={{ color: "red" }}>*</span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={add_admin.password}
                  onChange={handleChange}
                  required
                  style={{ border: "1px solid" }}
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="position-absolute"
                  style={{ top: '50%', right: '10px', cursor: 'pointer', transform: 'translateY(15%)' }}
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
                <div className="float-end mx-1">
                {loading ? (
                  <LoadingSub btnName="Submit" color="primary" />
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="applyleave"
                  >
                    Submit
                  </button>
                )}
              </div>  
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
