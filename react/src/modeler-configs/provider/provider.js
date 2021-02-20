import inherits from "inherits";
import PropertiesActivator from "bpmn-js-properties-panel/lib/PropertiesActivator";

import generalGroup from "./groups/general"
import scenarioGroup from "./groups/scenario"
import scenarioParameters from "./groups/scenarioParameters"

export default function PropertiesProvider(
  eventBus,
  bpmnFactory,
  canvas,
  elementRegistry,
  translate,
  moddle
) {

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

    var scenarioTab = {
      id: "scenarioTab",
      label: "Scenario",
      groups: scenarioGroup({ element, bpmnFactory, canvas, elementRegistry, translate, moddle })
    };

    var scenarioParametersTab = {
      id: "scenarioParametersTab",
      label: "Scenario Parameters",
      groups: scenarioParameters({ element, bpmnFactory, canvas, elementRegistry, translate, moddle })
    };
    return [scenarioTab, scenarioParametersTab];
  };
}

inherits(PropertiesProvider, PropertiesActivator);
