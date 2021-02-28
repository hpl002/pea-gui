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


  factory.scenarioParameter.attributes({ group: attributes, element, translate, attribute: "replication" });
  factory.scenarioParameter.attributes({ group: attributes, element, translate, attribute: "seed" });
  factory.scenarioParameter.attributes({ group: attributes, element, translate, attribute: "baseTimeUnit" });
  factory.scenarioParameter.attributes({ group: attributes, element, translate, attribute: "baseCurrencyUnit" });

  // add support for scenarioParameters elements
  /*
  - start
  - duration
  - warmup
  - propertyparameters
  */
  factory.scenarioParameter.elements({ group: parameters, element, translate, elementType: "start" });
  factory.scenarioParameter.elements({ group: parameters, element, translate, elementType: "duration" });
  factory.scenarioParameter.elements({ group: parameters, element, translate, elementType: "warmup" });

  return [attributes, parameters];
}