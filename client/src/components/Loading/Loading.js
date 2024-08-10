import React from "react";

const Loading = ({height}) => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ height: `${height}` }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#0e2238" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
