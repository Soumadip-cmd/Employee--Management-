import React, { useContext, useEffect, useState } from "react";
import Select, { components } from "react-select";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";

export default function EditSalary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const { editSal, getStaff, getDept, staff, dept, salary } = useContext(DataContext);
  
  const [editSaldata, setEditSaldata] = useState({
    id: id,
    StaffName: "",
    department: "",
    Paid_Salary: "",
  });
  const [basicSalary, setBasicSalary] = useState(0);
  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    getDept();
    getStaff();
  }, []);

  useEffect(() => {
    const editSal_Data = salary.find((data) => data._id === id);
    if (editSal_Data) {
      setEditSaldata({
        id: editSal_Data._id,
        StaffName: { value: editSal_Data.StaffName, label: editSal_Data.StaffName },
        department: editSal_Data.department,
        Paid_Salary: editSal_Data.Paid_Salary,
      });
      setBasicSalary(editSal_Data.Paid_Salary); // Initial value for basicSalary
      setAllowance(editSal_Data.Paid_Salary); // Initial value for allowance
    }
  }, [id, salary]);

  useEffect(() => {
    // Calculate Paid_Salary whenever basicSalary or allowance changes
    const sum = basicSalary + allowance;
    setEditSaldata(prevState => ({
      ...prevState,
      Paid_Salary: sum
    }));
  }, [basicSalary, allowance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editSal(editSaldata.id, editSaldata.StaffName.value, editSaldata.department, editSaldata.Paid_Salary);
    navigate('/manageSalary'); // Redirect after submit if needed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "basicSalary") {
      setBasicSalary(parseInt(value) || 0);
    } else if (name === "allowance") {
      setAllowance(parseInt(value) || 0);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setEditSaldata({ ...editSaldata, StaffName: selectedOption });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgb(0 77 255 / 65%)" }}>
        <div className="container mt-5">
          <NavLink className="navbar-brand" style={{ fontSize: "25px", color: "white", letterSpacing: ".05125em" }} to="/">
            Salary
          </NavLink>
          <div className="mt-2 pt-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/" className="text-dark fw-semibold text-decoration-none">
                    Home
                  </NavLink>
                </li>
                <li className="breadcrumb-item active fw-semibold text-decoration-underline" aria-current="page">
                  Edit
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/manageSalary" className="text-dark fw-semibold text-decoration-none">
                    Manage Salary
                  </NavLink>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </nav>
      <div className="bg-muted pt-2 extra-special2 min-h-screen d-flex justify-content-center align-items-center">
        <div className="bg-card p-6 w-100 max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground mb-4">Edit Salary</h1>
          <div className="bg-white p-4 rounded-lg shadow-md rounded-top rounded-bottom-1" style={{ borderTop: "5px solid #004dffe8" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label text-muted-foreground mb-2"><b>Department Name</b></label>
                <select
                  className="form-control"
                  style={{ border: "1px solid" }}
                  required
                  name="department"
                  value={editSaldata.department}
                  onChange={(e) => setEditSaldata({ ...editSaldata, department: e.target.value })}
                >
                  <option value="" disabled>--Department Name--</option>
                  {dept.map((item, index) => (
                    <option key={index} value={item.deptName}>{item.deptName}</option>
                  ))}
                </select>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered bg-white rounded-lg table-striped tablestyle">
                  <thead className="tablestyle">
                    <tr>
                      <th className="px-4 py-2 text-start">Staff</th>
                      <th className="px-4 py-2 text-start">Basic Salary($)</th>
                      <th className="px-4 py-2 text-start">Allowance($)</th>
                      <th className="px-4 py-2 text-start">Total($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1 px-2 tablestyle">
                        <Select
                          name="StaffName"
                          value={editSaldata.StaffName}
                          onChange={handleSelectChange}
                          placeholder="Select Staff Name.."
                          isClearable
                          menuPortalTarget={document.body}
                          styles={{
                            container: (provided) => ({
                              ...provided,
                              width: "100%",
                            }),
                            control: (provided) => ({
                              ...provided,
                              borderColor: "#ced4da",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor: "#ced4da",
                              },
                            }),
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            option: (provided) => ({
                              ...provided,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }),
                            clearIndicator: (base) => ({
                              ...base,
                              display: isFocused ? "block" : "none",
                            }),
                          }}
                          menuPosition="fixed"
                          components={{ DropdownIndicator: () => null, ClearIndicator: (props) => isFocused ? <components.ClearIndicator {...props} /> : null }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          options={staff.map(s => ({ value: s.name, label: s.name }))}
                          required
                        />
                      </td>
                      <td className="p-1 px-2 tablestyle">
                        <input
                          type="number"
                          id="basicSalary"
                          name="basicSalary"
                          className="rounded-2 w-100 px-2"
                          style={{ border: "1px solid black" }}
                          value={basicSalary}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                      <td className="p-1 px-2 tablestyle">
                        <input
                          type="number"
                          id="allowance"
                          name="allowance"
                          className="rounded-2 w-100 px-2"
                          style={{ border: "1px solid black" }}
                          value={allowance}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                      <td className="p-1 px-2 tablestyle">
                        <input
                          type="number"
                          id="total"
                          className="rounded-2 w-100 px-2"
                          style={{ border: "1px solid black" }}
                          readOnly
                          name="Paid_Salary"
                          value={editSaldata.Paid_Salary}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 d-flex justify-content-end">
                <button className="btn btn-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
