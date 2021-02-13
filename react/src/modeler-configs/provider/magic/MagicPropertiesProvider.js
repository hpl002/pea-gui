import inherits from "inherits";

import PropertiesActivator from "bpmn-js-properties-panel/lib/PropertiesActivator";

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps";
import eventProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps";
import linkProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps";
import documentationProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps";
import idProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps";
import nameProps from "bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps";

import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";

function createMagicTabGroups({
  element,
  bpmnFactory,
  canvas,
  elementRegistry,
  translate,
}) {
  var generalGroup = {
    id: "general",
    label: "General",
    entries: [],
  };
  idProps(generalGroup, element, translate);
  nameProps(generalGroup, element, bpmnFactory, canvas, translate);
  processProps(generalGroup, element, translate);

  var documentationGroup = {
    id: "documentation",
    label: "Documentation",
    entries: [],
  };

  documentationProps(documentationGroup, element, bpmnFactory, translate);

  var scenarioGroup = {
    id: "scenario",
    label: "Scenario",
    entries: [],
  };

  scenarioGroup.entries.push(
    entryFactory.textField(translate, {
      id: "spell",
      description: "Apply a black magic spell",
      label: "Spell",
      modelProperty: "spell",
    })
  );

  return [generalGroup, documentationGroup, scenarioGroup];
}

export default function MagicPropertiesProvider(
  eventBus,
  bpmnFactory,
  canvas,
  elementRegistry,
  translate
) {
  PropertiesActivator.call(this, eventBus);

  this.getTabs = function (element) {
    var simulationTab = {
      id: "simulationTab",
      label: "Simulation",
      groups: createMagicTabGroups({
        element,
        bpmnFactory,
        canvas,
        elementRegistry,
        translate,
      }),
    };

    return [simulationTab];
  };
}

inherits(MagicPropertiesProvider, PropertiesActivator);
