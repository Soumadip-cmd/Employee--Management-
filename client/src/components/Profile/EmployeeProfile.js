import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editProfile, setEditProfile] = useState({
    id: id,
    name: ""
  });
  const [staffData, setStaffData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const camera = useRef(null);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    if (!localStorage.getItem("staff-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Initial data fetch
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-staff`, {
          headers: {
            'staff-token': localStorage.getItem('staff-token')
          }
        });
        const { success, data } = await response.json();
        
        if (success && data) {
          setStaffData(data);
          setEditProfile({
            id: data._id,
            name: data.name
          });
          if (data.photo?.url) {
            setPreviewUrl(data.photo.url);
          }
        } else {
          toast.error("Failed to load profile data");
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaffData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      if (!file && editProfile.name === staffData.name) {
        toast.error("Please update either name or photo");
        setIsUpdating(false);
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          await submitUpdate(reader.result);
        };
      } else {
        await submitUpdate(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating");
      setIsUpdating(false);
    }
  };

  const submitUpdate = async (photoData) => {
      try {
        const updateData = {
          name: editProfile.name
        };
    
        if (photoData) {
          updateData.photo = photoData;
        }
    
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/staff/update/${editProfile.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'staff-token': localStorage.getItem('staff-token')
          },
          body: JSON.stringify(updateData)
        });
    
        const { success, data } = await response.json();
    
        if (success) {
          toast.success("Profile updated successfully");
          navigate("/employee/dashboard");
        } else {
          toast.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error submitting update:", error);
        toast.error("Failed to update profile");
      } finally {
        setIsUpdating(false);
      }
    };

  const handleCamera = () => {
    camera.current.click();
  };

  const handleChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  const photoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5000000) { // 5MB
        toast.error("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  if (isLoading) {
    return (
      <div className="vh-100 vw-100 position-fixed top-0 start-0 d-flex justify-content-center align-items-center"
           style={{ zIndex: 1000 }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100">
      <div className="form-container p-3 p-md-4">
        <div className="bg-light p-lg-4 p-2 rounded shadow-sm">
          <h2 className="h4 mb-3">Profile</h2>
          <p className="text-muted">You can update your details:</p>
          <hr className="border-1 border-black" />
          
          <form className="form-control" onSubmit={handleUpdate}>
            {/* Profile Image Section */}
            <div className="text-center mb-4 position-relative">
              <img
                src={previewUrl || "https://placehold.co/100x100"}
                width={100}
                height={100}
                alt="User Profile"
                className="rounded-circle mb-3 object-fit-cover"
              />
              <span
                className="rounded-circle p-2 d-flex justify-content-center align-items-center bg-opacity-80 border-2 bg-light position-absolute"
                style={{
                  width: "fit-content",
                  bottom: "18px",
                  right: "50%",
                  transform: "translateX(51px)",
                  border: "2px solid #26262f",
                  cursor: "pointer"
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

            {/* Name Input */}
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Full Name"
                onChange={handleChange}
                name="name"
                required
                value={editProfile.name}
              />
              <label htmlFor="floatingInput">Full Name</label>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-2">
              {isUpdating ? (
                <div className="text-center p-2">
                  <Loading />
                </div>
              ) : (
                <button type="submit" className="btn btn-success">
                  Update Details
                </button>
              )}

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/employee/dashboard")}
                disabled={isUpdating}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;