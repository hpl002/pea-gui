import Stats from "../../helper";
import React from "react";
import App from "../modeler";
const Modeler = (props) => {
  return (
    <div style={{ height: "calc(100vh - 30px)", padding: "10px" }}>
      <App />
    </div>
  );
};

export default Modeler;
