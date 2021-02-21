import factory from "../props/scenario-props/attribute-factory"
import scenarioHelper from "../../../modeler-configs/helper/bpsim"



export default function createGroups({ element, bpmnFactory, translate, commandStack }) {
  var scenarioGroup = {
    id: "scenario",
    label: "Scenario",
    entries: [],
  };

  // check if scenario exists, if not then create a new one
  /* const currentScenario = scenarioHelper.getScenario(element)
  if (currentScenario) {
    console.log("found scenario")
  }
  else {
    console.log("could not find scenario")
    scenarioHelper.createScenario({ element, bpmnFactory, commandStack })
  } */


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