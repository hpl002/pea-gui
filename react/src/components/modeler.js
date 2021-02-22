
/* eslint-disable react/prop-types */
import convert from "xml-js"
import React, { useEffect, useState } from "react";
import Styled from "styled-components";



import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import propertiesPanelModule from "bpmn-js-properties-panel";

import bpsimPropertiesPanel from "../modeler-configs/provider"
import bpsimDescriptor from '../modeler-configs/descriptors/bpsim.json';



const Component = (props) => {
  if (props.code) {
    var options = { compact: true, ignoreComment: true, spaces: 4 };
    var result = convert.json2xml(props.code, options);
  }

  if (props.display) {
    return (
      <SyntaxHighlighter
        language={props.language}
        style={docco}
        customStyle={{ height: "inherit" }}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
        wrapLines={true}
      >
        {result ? result : ""}
      </SyntaxHighlighter>
    );
  }
  return "";
};

var vbpmnModeler = false;
var prevStep = undefined;

const newModeler = () => {
  try {
    const bpmnModeler = new Modeler({
      container: "#canvas",
      propertiesPanel: {
        parent: "#properties",
      },
      additionalModules: [propertiesPanelModule, bpsimPropertiesPanel],
      moddleExtensions: {
        bpsim: bpsimDescriptor
      }
    });
    return bpmnModeler
  } catch (error) {
    console.error("could not create a new modeler", error)
  }

};


const updateModeler = (bpmnModeler, model) => {

  var options = { compact: true, ignoreComment: true, spaces: 4 };
  var result = convert.json2xml(model, options);

  bpmnModeler
    .importXML(result)
    .then(({ warnings }) => {
      if (warnings.length) {
        console.log("Warnings", warnings);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
  return bpmnModeler;
}



function App(props) {
  const { state: { model, handleChange }, } = props;
  const [displayModeler, setDisplayModeler] = useState(true);

  const saveModelToState = async (callback) => {
    if (vbpmnModeler) {
      try {
        const result = await vbpmnModeler.saveXML({ format: true });
        const { xml } = result;
        var xmlAsJson = convert.xml2json(xml, { compact: true, spaces: 4 });
        xmlAsJson = JSON.parse(xmlAsJson)
        handleChange(xmlAsJson);
        callback();
      } catch (err) {
        console.log(err);
      }
    }
  }


  useEffect(() => {
    if (model && !vbpmnModeler) {
      vbpmnModeler = newModeler();
      updateModeler(vbpmnModeler, model)
    }
    else if (model && vbpmnModeler) {
      updateModeler(vbpmnModeler, model)
    }
  }, [model]);

  useEffect(async () => {
    if (!prevStep) prevStep = props.currentStep
    if (prevStep === 3) {
      await saveModelToState();
      console.log("current step:", props.currentStep)
      console.log("previous step:", prevStep)
    }

    prevStep = props.currentStep
  }, [props.currentStep]);

  const handleClick = async () => {
    if (vbpmnModeler && model) {
      await saveModelToState(() => { setDisplayModeler(!displayModeler) });
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <ModelerWraper id="modeler">
          <Canvas
            id="canvas"
            style={{ display: displayModeler ? "initial" : "none" }}
          >
          </Canvas>
          <Properties
            id="properties"
            style={{
              display: displayModeler ? "initial" : "none",
              overflow: "auto",
            }}
          />
          <Component
            display={!displayModeler}
            code={model}
            style={{ height: "inherit" }}
          />
        </ModelerWraper>
      </ContentWrapper>
      <Styledbutton
        className="btn btn-info btn-block"
        onClick={() => {
          handleClick();
        }}
      >
        {displayModeler ? 'View XML' : 'View modeler'}
      </Styledbutton>
    </Wrapper>
  );
}
export default App;

const ModelerWraper = Styled.div`     
  border: 1px solid #000000;
  height: 100%;
  width: 100%;
  margin: auto;
  marginBottom:10px;
  display:flex;
`;

const Properties = Styled.div`     
background-color: #f8f8f8;
width: 20%;
`;

const Canvas = Styled.div`     
display: flex;
height: inherit;
width: 80%;
`;

const Wrapper = Styled.div`     
  display: flex;
  height: calc(-40px + 100vh);
  flex-direction:column;
`;

const ContentWrapper = Styled.div`     
  display: flex;   
  flex-direction:column;
  height: calc(-100px + 100vh);
  margin-bottom: 10px;
`;

const Styledbutton = Styled.button`     
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top:auto;
  margin-bottom: 10px;
`;
