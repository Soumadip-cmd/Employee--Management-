import React, { useContext } from "react";
import Card from "./Card";
import './Dashboard.css'
import DataContext from "../../context/DataContext";


const Dashboard = () => {

  const {dept,staff,salary}=useContext(DataContext)  

  return (
    <div className=" special mt-5 ms-2">
      <div className="container p-3 ">
        <span style={{ fontSize: "2em", fontWeight: "600" }}>Dashboard </span>
        <span style={{ fontSize: "1em" }}> Control panel</span>
      </div>
      <hr
        style={{
          position: "relative",
          bottom: "29px",
        }}
      />
      <div className="container my-2 ">
        <div className="row" style={{ transform: "translateY(-19px)" }}>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={dept.length}
              category="Department"
              cardbgcolor="blue"
              pageLink="/manageDepartment"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={staff.length}
              category="Staff"
              cardbgcolor="rgb(88 13 51)"
              pageLink="/manageStaff"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number="5"
              category="Leave Requests"
              cardbgcolor="#c70d0d"
              pageLink="/leaveHistory"
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <Card
              number={`${salary.length}`}
              category="Salary Paid"
              cardbgcolor="green"
              pageLink="/manageSalary"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;