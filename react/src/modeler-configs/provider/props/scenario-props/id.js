import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import extHelper from "bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import scenarioHelper from '../../../helper/bpsim';

export default function (group, element, bpmnFactory, translate) {
  const scenario = scenarioHelper.get(element)

  var getValue = function () {
    return function (element) {
      const scenario = scenarioHelper.get(element)
      return { scenario_id: scenario.id };
    };
  };

  const setValue = function (businessObject) {
    return function (element, values) {
      const scenario = scenarioHelper.get(element)
      scenario.id = values.scenario_id
      return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
    };
  };


  if (element?.type == "bpmn:Process" && scenario) {
    var elementDocuEntry = entryFactory.textBox(translate, {
      id: 'scenario_id',
      label: translate('id'),
      modelProperty: 'scenario_id'
    });

    elementDocuEntry.set = setValue(getBusinessObject(element))
    elementDocuEntry.get = getValue(getBusinessObject(element));
    group.entries.push(elementDocuEntry);
  }
}
