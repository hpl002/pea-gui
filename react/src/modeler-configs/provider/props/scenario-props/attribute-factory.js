
import properties from "./properties";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import scenarioHelper from '../../../helper/bpsim';

export default function (group, element, bpmnFactory, translate, attribute, type = "textField") {
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
        var elementDocuEntry = entryFactory[type](translate, {
            id: attributeIdentifier,
            label: translate(attribute),
            modelProperty: attributeIdentifier
        });

        elementDocuEntry.set = setValue(getBusinessObject(element))
        elementDocuEntry.get = getValue(getBusinessObject(element));
        group.entries.push(elementDocuEntry);
    }
}


export function button(group, element, bpmnFactory, translate, attribute) {
    var propertiesEntry = properties(element, bpmnFactory, {
        id: 'properties',
        modelProperties: ['id'],
        labels: [translate('identifier')],

        getParent: function (element, node, businessObject) {
            return businessObject.extensionElements;
        },

        createParent: function (element, businessObject) {
            var parent = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, businessObject, bpmnFactory);
            var cmd = cmdHelper.updateBusinessObject(element, businessObject, { extensionElements: parent });
            return {
                cmd: cmd,
                parent: parent
            };
        }
    }, translate);

    if (propertiesEntry) {
        group.entries.push(propertiesEntry);
    }

}
