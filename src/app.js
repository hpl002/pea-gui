import Wizard from "./components/wizard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/app.module.scss";
import React, { useState } from "react"; 

export const ModelerContext = React.createContext();

export default function App() {
  const [model, setModel] = useState("some value");
  //create a hook that logs every time the state is updated
  //should therefore log whenver we update state from eithr child

  function handleChange(newValue) {
    setModel(newValue);
  }

  return (
          <div style={{ height: "100vh" }}>
            <Wizard style={{ height: "100vh" }} state={{ model, handleChange }} />
          </div>
     
  );
}

// update state from the modeler component
// render results in the viewer component
