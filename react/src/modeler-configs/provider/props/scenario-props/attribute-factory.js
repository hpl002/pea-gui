
import properties from "./properties";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import scenarioHelper from '../../../helper/bpsim';


const factory = {}

factory.scenario = (group, element, bpmnFactory, translate, attribute, type = "textField") => {

    // pass inn the process element and get back the current scenario set accoring to the scenario id
    const scenario = scenarioHelper.getScenario(element)

    const attributeIdentifier = `scenario_${attribute}`

    //get the attribute value
    var getValue = function () {
        return function (element) {
            const scenario = scenarioHelper.getScenario(element)
            const response = {};
            response[attributeIdentifier] = scenario[attribute]
            return response;
        };
    };

    //setthe attribute value
    const setValue = function (businessObject) {
        return function (element, values) {
            const scenario = scenarioHelper.getScenario(element)
            scenario[attribute] = values[attributeIdentifier]
            return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };

    //only show fields if if the currently selected element is the process element
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

factory.scenarioParameters = (group, element, bpmnFactory, translate, attribute, type = "textField") => {

    // pass inn the process element and get back the current scenario set accoring to the scenario id
    const scenario = scenarioHelper.getScenario(element)

    const attributeIdentifier = `scenario_${attribute}`

    //get the attribute value
    var getValue = function () {
        return function (element) {
            const scenario = scenarioHelper.getScenario(element)
            const response = {};
            response[attributeIdentifier] = scenario[attribute]
            return response;
        };
    };

    //setthe attribute value
    const setValue = function (businessObject) {
        return function (element, values) {
            const scenario = scenarioHelper.getScenario(element)
            scenario[attribute] = values[attributeIdentifier]
            return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };

    //only show fields if if the currently selected element is the process element
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

export default factory



