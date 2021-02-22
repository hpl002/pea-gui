import convert from "xml-js"
import { findPathDeep } from 'deepdash-es/standalone';
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

  const getScenarios = () => {

    console.log("get scenarios")
    const predicate = (element) => {
      return (value, key, parentValue, context) => {
        const pathArray = context._item.path
        if (pathArray.includes(element)) {
          return true
        }
      }
    }

    var pathArray = getPath(model, predicate("bpsim:Scenario"), {
      checkCircular: false,
      pathFormat: 'array'
    })


    const indexOfElement = pathArray.findIndex(x => x.includes("bpsim:Scenario"))
    pathArray.length = indexOfElement + 1

    pathArray = pathArray.join(".")

    return lodash.get(model, pathArray, [])
  }

  const setActive = (event) => {
    setCurrElem(event?.target?.id)
    event.stopPropagation();
  }


  const getPath = (obj, predicate, poptions) => {
    var options = {
      checkCircular: false,
      pathFormat: 'string'
    }
    if (poptions) options = poptions
    return findPathDeep(obj, predicate, options)
  }



  const deleteScenario = (event) => {
    const predicate = (value, key, parentValue, context) => {
      const pathArray = context._item.path
      if (pathArray.includes("bpsim:Scenario")) {
        if (key === "id" && value === event.target.parentNode.id) return true
      }
    }

    const scenarioPath = getPath(model, predicate).split(".")[0]

    console.log(getScenarios().length)

    // https://github.com/kolodny/immutability-helper
    // see the link above for more on immutable data
    // currently the state is being updated even though i am no calling setstate directly


    lodash.unset(model, scenarioPath, {})

    //    handleChange(copy)
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
