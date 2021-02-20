import factory, { button } from "../props/scenario-props/attribute-factory"



export default function createGroups({ element, bpmnFactory, translate }) {
  var scenarioGroup = {
    id: "scenario",
    label: "Scenario",
    entries: [],
  };
  // TODO: button initializing a new scenario on some model that does not have any bpsim data
  //button(scenarioGroup, element, bpmnFactory, translate);

  // TODO: dropdown for selecting the current scenarios. A single document can hold many scenarios. 
  // TODO: button for deleting some scenario and all related tags from file


  factory(scenarioGroup, element, bpmnFactory, translate, "id");
  factory(scenarioGroup, element, bpmnFactory, translate, "name");
  factory(scenarioGroup, element, bpmnFactory, translate, "description", "textBox");
  factory(scenarioGroup, element, bpmnFactory, translate, "author");
  //factory(scenarioGroup, element, bpmnFactory, translate, "vendor");
  factory(scenarioGroup, element, bpmnFactory, translate, "version");
  //factory(scenarioGroup, element, bpmnFactory, translate, "inherits");
  //factory(scenarioGroup, element, bpmnFactory, translate, "result");
  //factory(scenarioGroup, element, bpmnFactory, translate, "created");
  //factory(scenarioGroup, element, bpmnFactory, translate, "modified");

  return [scenarioGroup];
}