import inherits from "inherits";
import PropertiesActivator from "bpmn-js-properties-panel/lib/PropertiesActivator";

import generalGroup from "./groups/general"
import scenarioGroup from "./groups/scenario"
import scenarioParametersGroup from "./groups/scenarioParameters"

export default function PropertiesProvider(eventBus, bpmnFactory, canvas, elementRegistry, translate, moddle, commandStack) {

  PropertiesActivator.call(this, eventBus);

  this.getTabs = function (element) {

    /*
    var generalTab = {
      id: "generalTab",
      label: "General",
      groups: generalGroup({
        element,
        bpmnFactory,
        canvas,
        elementRegistry,
        translate,
      }),
    };
    */

    var scenarioAttributes = {
      id: "scenarioTab",
      label: "Scenario attributes",
      groups: scenarioGroup({ element, bpmnFactory, canvas, elementRegistry, translate })
    };

    var scenarioParameters = {
      id: "scenarioParameters",
      label: "Scenario Parameters",
      groups: scenarioParametersGroup({ element, bpmnFactory, canvas, elementRegistry, translate })
    };



    return [scenarioAttributes, scenarioParameters];
  };
}

inherits(PropertiesProvider, PropertiesActivator);
