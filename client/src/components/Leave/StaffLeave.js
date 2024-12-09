import React, { useEffect, useState } from "react";
import "./ApplyLeave.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function StaffLeave() {
  const [entries, setEntries] = useState(5);
  const [search, setSearch] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/');
    }
    fetchLeaves();
  }, [navigate]);

  const fetchLeaves = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/leaves`, {
        headers: {
          'token': localStorage.getItem('authToken')
        }
      });
      const data = await response.json();
      setLeaves(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      toast.error('Error loading leave data');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (leaveId, status) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/leave/${leaveId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Leave ${status} successfully`);
        fetchLeaves(); // Refresh leave list
      } else {
        toast.error(data.msg || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating leave status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  // Filter and pagination logic
  const filteredLeaves = leaves.filter(leave => 
    leave.staffId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    leave.reason?.toLowerCase().includes(search.toLowerCase()) ||
    leave.description?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entries;
  const indexOfFirstEntry = indexOfLastEntry - entries;
  const currentLeaves = filteredLeaves.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredLeaves.length / entries);

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
            Leave
          </NavLink>

          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard" className="text-dark fw-semibold text-decoration-none">
                    Home
                  </NavLink>
                </li>
                <li className="breadcrumb-item active fw-semibold text-decoration-underline" aria-current="page">
                  Staff's Leave
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="pt-3 extra-special3 text-dark">
        <h1 className="fs-2 mb-4">Leave Management</h1>
        <div className="bg-white text-dark p-3 py-4 rounded-top rounded-bottom-1 shadow" style={{ borderTop: "5px solid #004dffe8" }}>
          <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">Staff's Leave</h2>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="entries" className="fs-6">Show</label>
              <select
                id="entries"
                className="form-select border-1 border-black form-select-sm"
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span className="fs-6">entries</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="form-control d-none d-md-flex"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger btn-sm">Search</button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered tablestyle table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Photo</th>
                  <th>Reason</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Description</th>
                  <th>Applied On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center">Loading...</td>
                  </tr>
                ) : currentLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">No leaves found</td>
                  </tr>
                ) : (
                  currentLeaves.map((leave, index) => (
                    <tr key={leave._id}>
                      <td>{indexOfFirstEntry + index + 1}</td>
                      <td>{leave.staffId?.name}</td>
                      <td className="text-center">
                        <img 
                          className="rounded-2" 
                          src={leave.staffId?.photo?.url || "https://placehold.co/64x64"} 
                          alt="Profile" 
                          style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{leave.reason}</td>
                      <td>{formatDate(leave.start)}</td>
                      <td>{formatDate(leave.end)}</td>
                      <td>{leave.description}</td>
                      <td>{formatDate(leave.created_at)}</td>
                      <td>
                        {leave.status === 'pending' && (
                          <>
                            <span
                              className="badge text-bg-success mx-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleStatusUpdate(leave._id, 'approved')}
                            >
                              Approve
                            </span>
                            <span
                              className="badge text-bg-danger mx-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleStatusUpdate(leave._id, 'rejected')}
                            >
                              Reject
                            </span>
                          </>
                        )}
                        {leave.status === 'approved' && (
                          <span className="badge text-bg-success">Approved</span>
                        )}
                        {leave.status === 'rejected' && (
                          <span className="badge text-bg-danger">Rejected</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="fs-6">
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredLeaves.length)} of {filteredLeaves.length} entries
            </span>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <button className="btn btn-primary btn-sm">{currentPage}</button>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}