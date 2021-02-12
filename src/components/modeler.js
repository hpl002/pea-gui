/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Styled from "styled-components";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

const Component = (props) => {
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
        {props.code ? props.code : ""}
      </SyntaxHighlighter>
    );
  }
  return "";
};

const newModeler = ({ model, canvas }) => {
  // eslint-disable-next-line react/no-find-dom-node
  console.log("trying to draw model. Does element exist in dom?", ReactDOM.findDOMNode(canvas))
  // eslint-disable-next-line react/no-find-dom-node
    const bpmnModeler = new Modeler({
      container: "#canvas",
      propertiesPanel: {
        parent: "#properties",
      },
      additionalModules: [propertiesPanelModule, propertiesProviderModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    });

    if (model) {
      bpmnModeler
        .importXML(model)
        .then(({ warnings }) => {
          if (warnings.length) {
            console.log("Warnings", warnings);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      bpmnModeler.createDiagram();
    }

    return bpmnModeler;
};

function App(props) {
  console.log(props.currentStep)
   
      
  const {
    state: { model, handleChange },
  } = props;
  const [localModel, localModelSet] = useState("");
  const [displayModeler, setDisplayModeler] = useState(true);
  const canvas = document.getElementById("canvas");

  useEffect(() => {          
    console.log("drawing model again")
      if (model) {
        const bpmnModeler = newModeler({ model, canvas });
        localModelSet(bpmnModeler);
      } 
  }, [model]);

  const handleClick = () => {
    if (localModel) {
      localModel.saveXML({ format: true }, function (err, xml) {
        handleChange(xml);
        setDisplayModeler(!displayModeler);
      });
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
          CANVAS HERE YO
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
        View model as XML
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
