import inherits from "inherits";
import PropertiesActivator from "bpmn-js-properties-panel/lib/PropertiesActivator";

import generalGroup from "./groups/general"
import scenarioGroup from "./groups/scenario"
import scenarioParametersGroup from "./groups/scenarioParameters"
import elementParametersGroup from "./groups/elementParameters"

export default function PropertiesProvider(eventBus, bpmnFactory, canvas, elementRegistry, translate, moddle, commandStack) {

  PropertiesActivator.call(this, eventBus);

  this.getTabs = function (element) {

    const tabsArr = []

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

    // TODO: conditionally render tabs. For example, we do not want to even show the tabs pertaining to the scenario whenever we have not selected the root process element

    if (element.type === "bpmn:Process") {
      var scenarioAttributes = {
        id: "scenarioTab",
        label: "Scenario attributes",
        groups: scenarioGroup({ element, bpmnFactory, canvas, elementRegistry, translate })
      };
      tabsArr.push(scenarioAttributes)

      var scenarioParameters = {
        id: "scenarioParameters",
        label: "Scenario Parameters",
        groups: scenarioParametersGroup({ element, bpmnFactory, canvas, elementRegistry, translate })
      };

      tabsArr.push(scenarioParameters)
    }
    else if (element.type === "bpmn:Task" || element.type === "bpmn:ExclusiveGateway") {
      var elementParameters = {
        id: "elementParameters",
        label: "Element Parameters",
        groups: elementParametersGroup({ element, bpmnFactory, canvas, elementRegistry, translate, moddle })
      };

      tabsArr.push(elementParameters)
    }

    return tabsArr
  };
}

inherits(PropertiesProvider, PropertiesActivator);
