import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import scenarioHelper from '../../../helper/bpsim';

export default function (group, element, bpmnFactory, translate, attribute) {
    const scenario = scenarioHelper.get(element)

    const attributeIdentifier = `scenario_${attribute}`

    var getValue = function () {
        return function (element) {
            const scenario = scenarioHelper.get(element)
            const response = {};
            response[attributeIdentifier] = scenario[attribute]
            return response;
        };
    };

    const setValue = function (businessObject) {
        return function (element, values) {
            const scenario = scenarioHelper.get(element)
            scenario[attribute] = values[attributeIdentifier]
            return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };


    if (element?.type == "bpmn:Process" && scenario) {
        var elementDocuEntry = entryFactory.textBox(translate, {
            id: attributeIdentifier,
            label: translate(attribute),
            modelProperty: attributeIdentifier
        });

        elementDocuEntry.set = setValue(getBusinessObject(element))
        elementDocuEntry.get = getValue(getBusinessObject(element));
        group.entries.push(elementDocuEntry);
    }
}
