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


    var ControlParameters = {
      id: "ControlParameters",
      label: "ControlParameters",
      entries: [],
    };


    var ResourceParameters = {
      id: "ResourceParameters",
      label: "ResourceParameters",
      entries: [],
    };

    var PriorityParameters = {
      id: "PriorityParameters",
      label: "PriorityParameters",
      entries: [],
    };

    var CostParameters = {
      id: "CostParameters",
      label: "CostParameters",
      entries: [],
    };

    var PropertyParameters = {
      id: "CostParaPropertyParametersmeters",
      label: "PropertyParameters",
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


    factory.elementParameters.elements({ group: ControlParameters, element, translate, parentElement: "controlParameters", childElement: "probability", moddle });
    factory.elementParameters.elements({ group: ControlParameters, element, translate, parentElement: "controlParameters", childElement: "condition", moddle });
    factory.elementParameters.elements({ group: ControlParameters, element, translate, parentElement: "controlParameters", childElement: "interTriggerTime", moddle });
    factory.elementParameters.elements({ group: ControlParameters, element, translate, parentElement: "controlParameters", childElement: "triggerCount", moddle });

    factory.elementParameters.elements({ group: ResourceParameters, element, translate, parentElement: "resourceParameters", childElement: "selection", moddle });
    factory.elementParameters.elements({ group: ResourceParameters, element, translate, parentElement: "resourceParameters", childElement: "availability", moddle });
    factory.elementParameters.elements({ group: ResourceParameters, element, translate, parentElement: "resourceParameters", childElement: "quantity", moddle });
    factory.elementParameters.elements({ group: ResourceParameters, element, translate, parentElement: "resourceParameters", childElement: "role", moddle });

    factory.elementParameters.elements({ group: PriorityParameters, element, translate, parentElement: "priorityParameters", childElement: "interruptible", moddle });
    factory.elementParameters.elements({ group: PriorityParameters, element, translate, parentElement: "priorityParameters", childElement: "priority", moddle });

    factory.elementParameters.elements({ group: CostParameters, element, translate, parentElement: "costParameters", childElement: "fixedCost", moddle });
    factory.elementParameters.elements({ group: CostParameters, element, translate, parentElement: "costParameters", childElement: "unitCost", moddle });

    //factory.elementParameters.elements({ group: PropertyParameters, element, translate, parentElement: "propertyParameters", childElement: "property", moddle });
    //factory.elementParameters.elements({ group: PropertyParameters, element, translate, parentElement: "propertyParameters", childElement: "queueLength", moddle });



    //TODO: add remaining fields and groups
    return [attributes, TimeParameters, ControlParameters, ResourceParameters, PriorityParameters, CostParameters];
  }
}