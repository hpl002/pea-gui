
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
            const response = {};
            response[attributeIdentifier] = scenario[attribute]
            return response;
        };
    };

    //setthe attribute value
    const setValue = function (businessObject) {
        return function (element, values) {
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

factory.scenarioParameter = {}

factory.scenarioParameter.attributes = (group, element, bpmnFactory, translate, attribute, type = "textField") => {

    // pass inn the process element and get back the current scenario set accoring to the scenario id
    const getParameters = () => {
        const scenario = scenarioHelper.getScenario(element)
        return scenario?.scenarioParameters?.[0]
    }

    const parameters = getParameters()

    const attributeIdentifier = `scenarioParameter_${attribute}`

    //get the attribute value
    var getValue = function () {
        return function (element) {
            const response = {};
            response[attributeIdentifier] = parameters[attribute]
            return response;
        };
    };

    //setthe attribute value
    const setValue = function (businessObject) {
        return function (element, values) {
            parameters[attribute] = values[attributeIdentifier]
            return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };

    //only show fields if if the currently selected element is the process element
    if (element?.type == "bpmn:Process" && parameters) {
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

/* factory.scenarioParameter.elements = (group, element, bpmnFactory, translate, elementType, type = "textField") => {
    // pass inn the process element and get back the current scenario set accoring to the scenario id
    const getParameters = () => {
        const scenario = scenarioHelper.getScenario(element)
        return scenario?.ScenarioParameters?.[0]
    }

    const parameters = getParameters()

    const attributeIdentifier = `scenarioParameterElement_${elementType}`

    //get the element value
    var getValue = function () {
        return function (element) {
            const response = {};
            response[attributeIdentifier] = parameters[elementType]?.ParameterValue
            return response;
        };
    };

    // assumes that the element always exists
    const setValue = function (businessObject) {
        return function (element, values) {
            parameters[elementType]["ParameterValue"] = values[attributeIdentifier]
            return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };

    //only show fields if if the currently selected element is the process element
    if (element?.type == "bpmn:Process" && parameters) {
        var elementDocuEntry = entryFactory[type](translate, {
            id: attributeIdentifier,
            label: translate(elementType),
            modelProperty: attributeIdentifier
        });

        elementDocuEntry.get = getValue(getBusinessObject(element));
        elementDocuEntry.set = setValue(getBusinessObject(element))
        group.entries.push(elementDocuEntry);
    }
} */

factory.scenarioParameter.elements = (group, element, bpmnFactory, translate, elementType, type = "textField") => {

    var bo = getBusinessObject(element),
        updates = [],
        extensionElements = bo.get('extensionElements');

    console.log("")

    // check if scenario extensionElement exists, if not then create it

    if (!extensionElements) {
        extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, element, bpmnFactory);

        updates.push(cmdHelper.updateBusinessObject(
            element, bo, { extensionElements: extensionElements }
        ));
    }



}

export default factory



