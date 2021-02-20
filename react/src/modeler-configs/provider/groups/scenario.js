import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import comment from "../props/scenario-props/scenario"
import factory from "../props/scenario-props/attribute-factory"
import id from "../props/scenario-props/id"
export default function createGroups({ element, bpmnFactory, canvas, elementRegistry, translate, moddle }) {
  var scenarioGroup = {
    id: "scenario",
    label: "Scenario",
    entries: [],
  };

  //id(scenarioGroup, element, bpmnFactory, translate);
  factory(scenarioGroup, element, bpmnFactory, translate, "id");
  factory(scenarioGroup, element, bpmnFactory, translate, "name");
  //comment(scenarioGroup, element, bpmnFactory, translate);
  /*
 
props
scenario:
  - name
  - id
  - description
  - version
  - created (set automatically but displayed)
  - modified (set automatically but displayed)
  - vendor (ignore)
  - inherits (ignore)
  - result (ignore)
*/





  return [scenarioGroup];
}