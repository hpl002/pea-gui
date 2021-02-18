import idProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps";
import nameProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps";
import processProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps";
import documentationProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps";

export default function createGroups({ element, bpmnFactory, canvas, elementRegistry, translate }) {
  var generalGroup = {
    id: "general",
    label: "General",
    entries: [],
  };

  idProps(generalGroup, element, translate);
  nameProps(generalGroup, element, bpmnFactory, canvas, translate);
  //processProps(generalGroup, element, translate);

  documentationProps(generalGroup, element, bpmnFactory, translate);

  return [generalGroup];
}
