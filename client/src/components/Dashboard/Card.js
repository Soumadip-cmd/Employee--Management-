import React from "react";
import './Card.css'
export default function Card(props) {
    // let myStyl={
    //     `background:`
    // }
    const {cardbgcolor,number,category,pageLink}=props
  return (
    <>
      <div className="container">
        <div className="card card-responsive mb-4 rounded-4 " >
          <div className="card-body " style={{background:`${cardbgcolor}`}}>
            <h2 className="card-title" style={{fontWeight:'800'}}>{number}</h2>
            <p className="card-text">{category}</p>
            <a href={`${pageLink}`} className="card-link card-footer" style={{background: '#ffffff61'}}>
              More Info →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}