import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";

function App() {
  const [diagram, diagramSet] = useState("");
  const container = document.getElementById("container");
  useEffect(() => {
    if (diagram.length === 0) {
      axios
        .get(
          "https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/resources/pizza-collaboration.bpmn"
        )
        .then((r) => {
          diagramSet(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [diagram]);
  if (diagram.length > 0) {
    const modeler = new Modeler({
      container,
      keyboard: {
        bindTo: document
      }
    });
    modeler
      .importXML(diagram)
      .then(({ warnings }) => {
        if (warnings.length) {
          console.log("Warnings", warnings);
        }

        const canvas = modeler.get("modeling");
        canvas.setColor("CalmCustomerTask", {
          stroke: "green",
          fill: "yellow"
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

console.log("drawing model")

  return (
    <div className="App" style={{"height":"calc(-50px + 100vh)"}}>
      <div
        id="container"
        style={{
          border: "1px solid #000000",
          height: "100%",
          width: "100%",
          margin: "auto"
        }}
      ></div>
    </div>
  );
}
export default App;
