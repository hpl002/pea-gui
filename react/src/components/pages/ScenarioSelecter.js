import convert from "xml-js"
import lodash from "lodash"
import React, { useEffect, useState } from "react";
import Styled from "styled-components";

const ScenarioSelecter = (props) => {

  const [scenarios, setScenarios] = useState([]);
  const [currElem, setCurrElem] = useState();
  const { state: { model, handleChange }, } = props;

  useEffect(() => {
    if (model) {
      const scenarios = getScenarios()
      setScenarios(scenarios ? scenarios : [])
      setCurrElem(getIdorIndex(scenarios[0]))
    }
  }, [model]);


  useEffect(() => {
    console.log("scenarios updated", scenarios.length)

  }, [scenarios]);



  /* returns closest and FIRST matching object */
  const closestMatch = (obj, key) => {
    var keysArr = Object.keys(obj)
    const absoluteKey = keysArr.filter(x => x.includes(key))
    if (!absoluteKey.length) return undefined
    return obj[absoluteKey[0]]
  }

  const getScenarios = () => {
    const bpsim = getBpsimdata()
    const scenarios = closestMatch(bpsim, "Scenario")
    return scenarios

  }

  const getBpsimdata = () => {
    var xmlAsJson = convert.xml2json(model, { compact: true, spaces: 4 });
    xmlAsJson = JSON.parse(xmlAsJson)
    const definitions = closestMatch(xmlAsJson, "definitions")
    const process = closestMatch(definitions, "process")
    const ext = closestMatch(process, "extensionElements")
    const bpsim = closestMatch(ext, "BPSimData")
    return bpsim
  }

  const setActive = (event) => {
    setCurrElem(event?.target?.id)
    event.stopPropagation();
  }


  /* provide xml document as object and the key of the element that you are looking for */
  /* will return the full path to first match. this can then be used in lodash for safe retrieval or spliced for use with chaining */
  const getPath = (obj, element) => {


    /*
    
    
    */

  }


  const updateBpsim = (newObject) => {


    /* 
    should do a recursive search until it finds the bpsim element and then return the path to this element    
    we then replace the value directly and convert back to string before storing on state
    */

    const options = { compact: false, spaces: 4 }
    const modelAsJson = JSON.parse(convert.xml2json(model, options))



  }

  const deleteScenario = (event) => {
    /* drop the clicked elemetn from state.scenarios  */

    /*  get path to scenarios */

    /*  drop the entire scenarios object and replace with that from state */


    /* const scenarioIdentifier = event?.target?.parentNode?.id

    const bpsimdata = getBpsimdata()
    const scenarios = bpsimdata?.[0]?.elements
    const remainingScenarios = scenarios.filter(x => x.attributes.id !== scenarioIdentifier)
    bpsimdata[0].elements = remainingScenarios
    updateBpsim(bpsimdata) */



    const arrCopy = [...scenarios];
    arrCopy.pop()
    setScenarios(arrCopy)
  }


  const getIdorIndex = (obj, index) => {
    const identifier = obj?._attributes?.id
    if (!identifier) return index
    return identifier
  }

  return (
    <div>
      <h3 className="text-center">
        select scenario
      </h3>
      <p className="text-center">select scenario and proceed to next step to view scenario details</p>
      <ListWrapper className="list-group">
        {scenarios.map((val, index) => (
          <Li key={getIdorIndex(val, index)} id={getIdorIndex(val, index)} className={currElem === getIdorIndex(val, index) ? "list-group-item active" : "list-group-item"} onClick={setActive}
          ><span>id: {getIdorIndex(val, index)}</span><Delete onClick={deleteScenario}>Delete</Delete></Li>
        ))}
        <Li className="list-group-item list-group-item-success" style={{ textAlign: "center" }}><span style={{ margin: "auto" }}>Create new scenario</span></Li>
      </ListWrapper>
    </div >
  );
};

export default ScenarioSelecter;

const ListWrapper = Styled.div`        
margin: 20px;
`;

const Li = Styled.li`     
  display: flex;
  cursor: pointer;   
`;

const Delete = Styled.span`     
  cursor: pointer;   
  margin-left:auto;
  color:red;
`;
