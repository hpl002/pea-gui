/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";
var parseString = require('xml2js').parseString;

const condition = true;

 

function App(props) {
  const [diagram, diagramSet] = useState("");
  const [modeler, modelerSet] = useState("");
  const container = document.getElementById("container");

  
  useEffect(() => {
    if (condition) {  
      //get diagram either by parsing file, retrieving from url, or initiate a empty one
      // set the result to state
      // use the state as condition in future useEffect callt
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
    }
  
  /* 
  create a new hook that runs whenever the state has been modified 
  in this hook we also have to save the modeler instance to state for later use
  
  */
  
  // eslint-disable-next-line react/no-find-dom-node
  if (diagram.length > 0 && ReactDOM.findDOMNode(container).childElementCount===0) { 
    
    const bpmnModeler = new Modeler({
      container,
      keyboard: {
        bindTo: document,
      },
    });
    bpmnModeler
    .importXML(diagram)
    .then(({ warnings }) => {
      if (warnings.length) {
        console.log("Warnings", warnings);
      }
      const canvas = modeler.get("modeling");
      canvas.setColor("CalmCustomerTask", {
        stroke: "green",
        fill: "yellow",
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
    modelerSet(bpmnModeler)
  }
}, [diagram, modeler]);


  const handleClick = () =>{
    modeler.saveXML({ format: true }, function (err, xml) {
      console.log(props);
      props.handleModelChange("lakkslmd");
      window.open("/modelXML");       
  });         
  }

  return (
    <div className="App" style={{ height: "calc(-100px + 100vh)" }}>
      <div
        id="container"
        style={{
          border: "1px solid #000000",
          height: "100%",
          width: "100%",
          margin: "auto",
        }}
      />
      <div style={{ height: "50px", padding:"10px 0px 10px 0px" }}>       
      <button className="btn btn-info btn-block" onClick={handleClick}>
          Open as XML in new window
        </button>         
       </div>
    </div>
  );
}
export default App;
