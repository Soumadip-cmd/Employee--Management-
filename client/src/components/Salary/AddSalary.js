import React, { useContext, useEffect, useState } from "react";
import Select, { components } from "react-select";
import { NavLink } from "react-router-dom";
import DataContext from "../../context/DataContext";

export default function AddSalary() {
  const [isFocused, setIsFocused] = useState(false);
  const { addSal, getStaff, getDept, staff, dept } = useContext(DataContext);
  const [addSalData, setAddSalData] = useState({ StaffName: "", department: "", Paid_Salary: null });
  const [basicSalary, setBasicSalary] = useState(null);
  const [allowance, setAllowance] = useState(null);

  const calculate = () => {
    const sum = (basicSalary || 0) + (allowance || 0);
    setAddSalData({ ...addSalData, Paid_Salary: sum });
  };

  useEffect(() => {
    getDept();
    getStaff();
  }, [getDept, getStaff]);

  useEffect(() => {
    calculate();
  }, [basicSalary, allowance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addSalData.StaffName && addSalData.department) {
      addSal(addSalData.StaffName.value, addSalData.department, addSalData.Paid_Salary);
      setAddSalData({ StaffName: "", department: "", Paid_Salary: null });
      setBasicSalary(null);
      setAllowance(null);
    } else {
      alert("Please select a staff member and department.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddSalData({ ...addSalData, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setAddSalData({ ...addSalData, StaffName: selectedOption });
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
          <NavLink className="navbar-brand" style={{ fontSize: "25px", color: "white", letterSpacing: ".05125em" }} to="/dashboard">
            Salary
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
                  Add
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
          <h1 className="text-2xl font-bold text-foreground mb-4">Salary</h1>
          <div className="bg-white p-4 rounded-lg shadow-md rounded-top rounded-bottom-1" style={{ borderTop: "5px solid #004dffe8" }}>
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold text-foreground mb-4">Add Salary</h2>
              <div className="mb-4">
                <label className="form-label text-muted-foreground mb-2"><b>Department Name</b></label>
                <select
                  className="form-control"
                  style={{ border: "1px solid" }}
                  required
                  name="department"
                  value={addSalData.department}
                  onChange={handleInputChange}
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
                          value={addSalData.StaffName}
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
                          id="num1"
                          className="rounded-2 w-100 px-2"
                          style={{ border: "1px solid black" }}
                          value={basicSalary || ""}
                          onChange={(e) => { setBasicSalary(parseFloat(e.target.value) || 0); }}
                        />
                      </td>
                      <td className="p-1 px-2 tablestyle">
                        <input
                          type="number"
                          id="num2"
                          className="rounded-2 w-100 px-2"
                          style={{ border: "1px solid black" }}
                          value={allowance || ""}
                          onChange={(e) => { setAllowance(parseFloat(e.target.value) || 0); }}
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
                          value={addSalData.Paid_Salary !== null ? addSalData.Paid_Salary : ""}
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
