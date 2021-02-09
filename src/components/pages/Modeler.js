/* eslint-disable react/prop-types */
import React from "react";
import App from "../modeler";
const Modeler = (props) => {
  return (
    <div style={{ height: "calc(100vh - 30px)", padding: "10px" }}>
      <App currentStep={props.currentStep} state={props.state} />
    </div>
  );
};

export default Modeler;
