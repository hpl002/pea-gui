import factory from "../props/scenario-props/attribute-factory"
import scenarioHelper from "../../helper/bpsim"



export default function createGroups({ element, bpmnFactory, translate, commandStack }) {
  var attributes = {
    id: "scenarioAttributes",
    label: "Attributes",
    entries: [],
  };

  var parameters = {
    id: "scenarioParameters",
    label: "Parameters",
    entries: [],
  };


  factory.scenarioParameter.attributes(attributes, element, bpmnFactory, translate, "replication");
  factory.scenarioParameter.attributes(attributes, element, bpmnFactory, translate, "seed");
  factory.scenarioParameter.attributes(attributes, element, bpmnFactory, translate, "baseTimeUnit");
  factory.scenarioParameter.attributes(attributes, element, bpmnFactory, translate, "baseCurrencyUnit");

  // add support for scenarioParameters elements
  /*
  - start
  - duration
  - warmup
  - propertyparameters
  */
  factory.scenarioParameter.elements(parameters, element, bpmnFactory, translate, "Start");
  //factory.scenarioParameter.elements(parameters, element, bpmnFactory, translate, "Duration");
  //factory.scenarioParameter.elements(parameters, element, bpmnFactory, translate, "Warmup");

  // 

  return [attributes, parameters];
}