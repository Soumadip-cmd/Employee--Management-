import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";

const Profile = () => {
  const { id } = useParams();
  const { updateProfile, admin } = useContext(DataContext);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editProfile, setEditProfile] = useState({ id: id, name: "", password: "" });
  const [photoUrl, setPhotoUrl] = useState("");

  const camera = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get admin details from localStorage
    const storedAdminDetails = JSON.parse(localStorage.getItem(`adminDetails-${id}`));
    
    if (storedAdminDetails) {
      // If details are found in localStorage, use them
      setEditProfile({
        id: storedAdminDetails._id,
        name: storedAdminDetails.name,
      });
      setPhotoUrl(storedAdminDetails.avatar.url);
      setPreviewUrl(storedAdminDetails.avatar.url);
    } else {
      // If not, find the admin details from the context
      const adminDetails = admin.find((k) => k._id === id);
      if (adminDetails) {
        setEditProfile({
          id: adminDetails._id,
          name: adminDetails.name,
        });
        setPhotoUrl(adminDetails.avatar.url);
        setPreviewUrl(adminDetails.avatar.url);

        // Save the details in localStorage
        localStorage.setItem(`adminDetails-${id}`, JSON.stringify(adminDetails));
      }
    }
  }, [id, admin]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    let photoUrlToUse = photoUrl;
    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        photoUrlToUse = reader.result;

        await updateProfile(
          editProfile.id,
          editProfile.name,
          editProfile.password,
          photoUrlToUse
        );

        setEditProfile({ id: id, name: "", password: "" });
        setFile(null);
        setPreviewUrl(""); // Reset preview URL
        navigate("/dashboard");

        // Update localStorage with new profile data
        localStorage.setItem(`adminDetails-${id}`, JSON.stringify({
          _id: editProfile.id,
          name: editProfile.name,
          avatar: { url: photoUrlToUse },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      await updateProfile(
        editProfile.id,
        editProfile.name,
        editProfile.password,
        photoUrlToUse
      );

      setEditProfile({ id: id, name: "", password: "" });
      setPreviewUrl(""); // Reset preview URL
      navigate("/dashboard");

      // Update localStorage with new profile data
      localStorage.setItem(`adminDetails-${id}`, JSON.stringify({
        _id: editProfile.id,
        name: editProfile.name,
        avatar: { url: photoUrlToUse },
      }));
    }
  };

  const handleCamera = () => {
    camera.current.click();
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const previewImg = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
  };

  const handleChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const photoChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      previewImg(selectedFile);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh" }}
      >
        <div className="form-container p-3 p-md-4 mt-5">
          <div className="bg-light p-lg-4 p-2 rounded shadow-sm">
            <h2 className="h4 mb-3">Profile</h2>
            <p className="text-muted">You can update the details:</p>
            <hr className="border-1 border-black" />
            <form action="" className="form-control" onSubmit={handleUpdate}>
              <div className="text-center mb-4 position-relative">
                <img
                  src={previewUrl}
                  width={100}
                  height={100}
                  alt="User Profile"
                  className="rounded-circle mb-3"
                />
                <span
                  className="rounded-circle p-2 d-flex justify-content-center align-items-center bg-opacity-80 border-2 bg-light position-absolute"
                  style={{
                    width: "fit-content",
                    bottom: "18px",
                    right: "50%",
                    transform: "translateX(51px)",
                    border: "2px solid #26262f",
                  }}
                  onClick={handleCamera}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-camera-fill"
                    viewBox="0 0 16 16"
                    style={{ cursor: "pointer" }}
                  >
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                  </svg>
                </span>
                <input
                  type="file"
                  ref={camera}
                  className="d-none"
                  onChange={photoChange}
                  accept="image/jpeg, image/png, image/webp, image/svg+xml"
                />
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Soumadip Santra"
                  onChange={handleChange}
                  name="name"
                  value={editProfile.name}
                />
                <label htmlFor="floatingInput">Full Name</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={editProfile.password}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <p className="mt-4 text-center text-muted d-grid">
                <button type="submit" className="btn btn-success">
                  Update Details
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
