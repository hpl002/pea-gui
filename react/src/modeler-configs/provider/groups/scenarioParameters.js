import factory, { button } from "../props/scenario-props/attribute-factory"



export default function createGroups({ element, bpmnFactory, translate }) {
  var group = {
    id: "scenarioParameters",
    label: "Parameters",
    entries: [],
  };
  // TODO: button initializing a new scenario on some model that does not have any bpsim data
  //button(scenarioGroup, element, bpmnFactory, translate);

  // TODO: dropdown for selecting the current scenarios. A single document can hold many scenarios. 
  // TODO: button for deleting some scenario and all related tags from file


  factory(group, element, bpmnFactory, translate, "id");

  return [group];
}