import inherits from "inherits";
import PropertiesActivator from "bpmn-js-properties-panel/lib/PropertiesActivator";

import generalGroup from "./groups/general"
import scenarioGroup from "./groups/scenario"

export default function MagicPropertiesProvider(
  eventBus,
  bpmnFactory,
  canvas,
  elementRegistry,
  translate,
  moddle
) {


  /* here i need to somehow  get moddle*/

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
      groups: scenarioGroup({
        element,
        bpmnFactory,
        canvas,
        elementRegistry,
        translate,
        moddle
      }),
    };






    return [scenarioTab];
  };
}

inherits(MagicPropertiesProvider, PropertiesActivator);
