import React from "react";
import DataContext from "./DataContext";

const DataState = (props) => {
      const data={
            name:"Soumadip"
      }
  return (
    <DataContext.Provider value={{data  }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
