import factory from "../props/scenario-props/attribute-factory"
import scenarioHelper from "../../helper/bpsim"



export default function createGroups({ element, bpmnFactory, translate, commandStack }) {
  var scenarioGroup = {
    id: "scenarioParameters",
    label: "Parameters",
    entries: [],
  };


  factory.scenario(scenarioGroup, element, bpmnFactory, translate, "id");

  return [scenarioGroup];
}