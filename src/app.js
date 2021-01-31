import Wizard from "./components/wizard";
import XmlViewer from "./components/modelXML";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/app.module.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const ModelerContext = React.createContext();

export default function App() {
  const [modelMeta, setmodelMeta] = useState("initial")
  return (
    <ModelerContext.Provider value={modelMeta}>
      <Router>
        <div>
          <Route exact path="/">
            <div style={{ height: "100vh" }}>
              <Wizard style={{ height: "100vh" }} handleModelChange={setmodelMeta}/>
            </div>
          </Route>
          <Route exact path="/modelXML">
            <XmlViewer />
          </Route>
        </div>
      </Router>
    </ModelerContext.Provider>
  );
}

// update state from the modeler component
// render results in the viewer component
