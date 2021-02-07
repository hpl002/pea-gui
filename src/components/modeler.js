/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modeler from "bpmn-js/lib/Modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/bpmn";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";
import Styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
var modelerConfig = require("../configs/modeler.json");

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

const condition = true;

function App(props) {
  const {
    state: { model, handleChange },
  } = props;
  const [diagram, diagramSet] = useState("");
  const [localModel, localModelSet] = useState("");
  const [displayModeler, setDisplayModeler] = useState(true);
  const canvas = document.getElementById("canvas");
  const properties = document.getElementById("properties");

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

    if (
      diagram.length > 0 &&
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(canvas).childElementCount === 0
    ) {
      const bpmnModeler = new Modeler({
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
        container: "#canvas",         
        keyboard: {
          bindTo: document,
        },
        moddleExtensions: {
          qa: modelerConfig,
        },
      });
      bpmnModeler
        .importXML(diagram)
        .then(({ warnings }) => {
          if (warnings.length) {
            console.log("Warnings", warnings);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
      localModelSet(bpmnModeler);
    }
  }, [diagram, localModel]);

  const handleClick = () => {
    localModel.saveXML({ format: true }, function (err, xml) {
      handleChange(xml);
      setDisplayModeler(!displayModeler);
    });
  };

  return (
    <Wrapper>
      <ContentWrapper>
      <ModelerWraper id="modeler" >         
        <div id="canvas"style={{ display: displayModeler ? "initial" : "none" }}/>                 
        <Component display={!displayModeler} code={model} style={{height:"inherit"}}/>
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
