import React ,{useState} from "react";
import "./ApplyLeave.css";
import { NavLink } from "react-router-dom";

export default function LeaveHistory() {
  let boxstyle = {
    background: "white",
    padding: "21px",
    borderTop: "5px solid #004dffe8",
    borderRadius: "5px",
    height: "auto",
  };
  const [entries, setEntries] = useState(1);
  const [search, setSearch] = useState('');
  
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
            Leave
          </NavLink>

          <div className=" mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/" className=" text-dark fw-semibold text-decoration-none">Home</NavLink>
                </li>
                <li className="breadcrumb-item active fw-semibold text-decoration-underline" aria-current="page">
                  History
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/applyLeave" className=" text-dark fw-semibold text-decoration-none">ApplyLeave</NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className=" pt-3  extra-special3  text-dark ">
      <h1 className="fs-2 mb-4">Leave Management</h1>
      <div className="bg-white     text-dark p-3 py-4 rounded-top rounded-bottom-1 shadow" style={{borderTop:'5px solid #004dffe8'}}>
        <h2 className="fs-4 fw-semibold mb-4 border-bottom pb-2">View Leave</h2>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="entries" className="  fs-6">Show</label>
            <select id="entries" className="form-select border-1  border-black form-select-sm" value={entries} onChange={(e) => setEntries(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span className="fs-6">entries</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <input type="text" placeholder="Search" className="form-control  d-none d-md-flex" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-danger btn-sm">Search</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered tablestyle table-striped" >
            <thead>
              <tr>
                <th>#</th>
                <th>Reason</th>
                <th >From</th>
                <th>To</th>
                <th>Status</th>
                <th>Description</th>
                <th >Applied On</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Somereason</td>
                <td>22-1-24</td>
                <td >1-2-24</td>
                <td>
                  <span className="badge bg-success text-white">Approved</span>
                </td>
                <td>Covid-19</td>
                <td>20-12-23</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="fs-6">Showing 1 to 2 of 2 entries</span>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm">&lt;</button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-primary btn-sm">&gt;</button>
          </div>
        </div>
      </div>
    </div>
      

      
    </>
  );
}