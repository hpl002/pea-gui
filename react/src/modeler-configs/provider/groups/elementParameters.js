import factory from "../props/scenario-props/attribute-factory"
import scenarioHelper from "../../helper/bpsim"

export default function createGroups({ element, bpmnFactory, translate, commandStack, moddle }) {
  //if the current element is one of these then do not bother showing the tab at all
  const excludeList = ["bpmn:Process"]
  if (excludeList.includes(element?.type)) {
    return []
  }
  else {
    var attributes = {
      id: "elementParametersAttributes",
      label: "Attributes",
      entries: [],
    };

    var TimeParameters = {
      id: "TimeParameters",
      label: "TimeParameters",
      entries: [],
    };

    factory.elementParameters.attributes({ group: attributes, element, translate, attribute: "elementRef", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "transferTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "queueTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "waitTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "setUpTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "processingTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "validationTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "reworkTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "lagTime", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "duration", moddle });
    factory.elementParameters.elements({ group: TimeParameters, element, translate, parentElement: "timeParameters", childElement: "elapsedTime", moddle });
    //TODO: add remaining fields and groups
    return [attributes, TimeParameters];
  }
}