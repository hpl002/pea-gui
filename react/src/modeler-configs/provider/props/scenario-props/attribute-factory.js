
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

const getParameters = (element) => {
    const scenario = scenarioHelper.getScenario(element)
    return scenario?.scenarioParameters?.[0]
}

factory.scenarioParameter.attributes = ({ group, element, bpmnFactory, translate, attribute, type = "textField" }) => {

    // pass inn the process element and get back the current scenario set accoring to the scenario id

    const parameters = getParameters(element)

    const identifier = `scenarioParameter_${attribute}`

    //get the attribute value
    var getValue = function () {
        return function (element) {
            const response = {};
            response[identifier] = parameters[attribute]
            return response;
        };
    };

    //setthe attribute value
    const setValue = function (businessObject) {
        return function (element, values) {
            parameters[attribute] = values[identifier]
            return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };

    //only show fields if if the currently selected element is the process element
    if (element?.type == "bpmn:Process" && parameters) {
        var elementDocuEntry = entryFactory[type](translate, {
            id: identifier,
            label: translate(attribute),
            modelProperty: identifier
        });

        elementDocuEntry.set = setValue(getBusinessObject(element))
        elementDocuEntry.get = getValue(getBusinessObject(element));
        group.entries.push(elementDocuEntry);
    }
}

const getParameterValue = (element) => {
    return element?.[0]?.["parameterValue"][0]
}

factory.scenarioParameter.elements = ({ group, element, bpmnFactory, translate, elementType, type = "textField" }) => {

    const parameters = getParameters(element)
    const identifier = `scenarioParameter_${elementType}`


    var getValue = function () {
        return function (element) {
            const response = {};

            const value = getParameterValue(parameters[elementType])
            if (!value) {
                console.log("could not find the parameterValue element within", elementType)
                response[identifier] = ""
            }
            else {
                response[identifier] = value.text
            }
            return response;
        };
    };

    //setthe attribute value
    const setValue = function (businessObject) {
        return function (element, values) {
            parameters[elementType][0].parameterValue[0].text = values[identifier]
            //return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };


    // get the element businessObject

    // check if it has the parameterValue element, if not then create this

    //only show fields if if the currently selected element is the process element
    if (element?.type == "bpmn:Process" && parameters) {
        var elementDocuEntry = entryFactory[type](translate, {
            id: identifier,
            label: translate(elementType),
            modelProperty: identifier
        });

        elementDocuEntry.set = setValue(getBusinessObject(element))
        elementDocuEntry.get = getValue(getBusinessObject(element));
        group.entries.push(elementDocuEntry);
    }
}









export default factory



