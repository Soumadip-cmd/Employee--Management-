import React from "react";

const LoadingSub = ({ btnName,color }) => {
  return (
    <>
      <button
        className={`btn btn-${color} `}
        type="button"
        disabled
        
      >
        <span
          className="spinner-border spinner-border-sm me-2"
          aria-hidden="true"
        ></span>
        <span role="status">{btnName}...</span>
      </button>
    </>
  );
};

export default LoadingSub;
