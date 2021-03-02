
import properties from "./properties";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import scenarioHelper from '../../../helper/bpsim';
import lodash from "lodash";


const addNewElementParameters = ({ element, moddle, extensionElements }) => {
    extensionElements.values[0].scenario[0].elementParameters = [
        moddle.create('bpsim:ElementParameters', {
            elementRef: element.id
        })
    ]

    return {
        cmd: 'properties-panel.update-businessobject',
        context: {
            element: element.businessObject.$parent,
            businessObject: element.businessObject.$parent,
            properties: { extensionElements: extensionElements }
        }
    }
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// get the ElementParameters element 
// append the correct child to this elememt (e..g TimeParameters)
const addNewElementParametersChild = ({ element, type, moddle, extensionElements }) => {
    //her we want to add the TimeParameters element
    const newElement = moddle.create(`bpsim:${capitalize(type)}`)
    extensionElements.values[0].scenario[0].elementParameters[0][type] = newElement

    return {
        cmd: 'properties-panel.update-businessobject',
        context: {
            element: element.businessObject.$parent,
            businessObject: element.businessObject.$parent,
            properties: { extensionElements: extensionElements }
        }
    }
}

const addNewElementParametersChildChild = ({ element, type, moddle, extensionElements, parent, value = "" }) => {
    //TransferTime
    const newElement = moddle.create(`bpsim:${capitalize(type)}`, {
        resultRequest: [
            moddle.create('bpsim:ResultRequest')
        ],
        parameterValue: [
            moddle.create('bpsim:ParameterValue', { text: value })
        ],
    })
    extensionElements.values[0].scenario[0].elementParameters[0][parent][0][type] = newElement

    return {
        cmd: 'properties-panel.update-businessobject',
        context: {
            element: element.businessObject.$parent,
            businessObject: element.businessObject.$parent,
            properties: { extensionElements: extensionElements }
        }
    }
}


const factory = {}

factory.scenario = (group, element, bpmnFactory, translate, attribute, type = "textField") => {

    // pass inn the process element and get back the current scenario set accoring to the scenario id
    const scenario = scenarioHelper.getScenario(getBusinessObject(element))

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
    if (scenario) {
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
factory.elementParameters = {}

const getParameters = (element) => {
    const scenario = scenarioHelper.getScenario(getBusinessObject(element))
    return scenario?.scenarioParameters?.[0]
}

const getElementParameters = (element) => {
    const parentProcess = element?.businessObject?.$parent
    const scenario = scenarioHelper.getScenario(parentProcess)
    return scenario?.elementParameters
}

factory.scenarioParameter.attributes = ({ group, element, bpmnFactory, translate, attribute, type = "textField" }) => {
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
            return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
        };
    };

    var elementDocuEntry = entryFactory[type](translate, {
        id: identifier,
        label: translate(elementType),
        modelProperty: identifier
    });

    elementDocuEntry.set = setValue(getBusinessObject(element))
    elementDocuEntry.get = getValue(getBusinessObject(element));
    group.entries.push(elementDocuEntry);
}



factory.elementParameters.attributes = ({ group, element, bpmnFactory, translate, attribute, type = "textField", moddle }) => {
    const identifier = `elementParameters${attribute}`
    var parameters = getElementParameters(element) ? getElementParameters(element) : []

    const currentParameter = parameters.filter(x => x.elementRef === element.id)

    var getValue = function () {
        return function (element) {
            const response = {};
            if (currentParameter?.[0]?.[attribute]) response[identifier] = currentParameter[0][attribute]
            return response;
        };
    };




    var elementDocuEntry = entryFactory[type](translate, {
        id: identifier,
        label: translate(attribute),
        modelProperty: identifier
    });

    elementDocuEntry.get = getValue(getBusinessObject(element));
    group.entries.push(elementDocuEntry);

}

factory.elementParameters.elements = ({ group, element, bpmnFactory, translate, type = "textField", moddle, parentElement, childElement }) => {
    const identifier = `elementParameters${childElement}`
    var elementParameters = getElementParameters(element) ? getElementParameters(element) : []


    var getValue = function () {
        var currentParameter = elementParameters.filter(x => x.elementRef === element.id)
        return function (element) {
            const response = {};
            const value = currentParameter?.[0]?.[parentElement]?.[0]?.[childElement]?.[0]?.parameterValue?.[0]?.text
            if (value) response[identifier] = value
            return response;
        };
    };


    const setValue = function (businessObject) {
        return function (element, values) {
            const extensionElements = scenarioHelper.getExtensinoElements(element.businessObject.$parent)

            const childOptions = {}
            // create transferTime element with its accompanying value
            childOptions[childElement] = [moddle.create(`bpsim:${capitalize(childElement)}`, {
                resultRequest: [
                    moddle.create('bpsim:ResultRequest')
                ],
                parameterValue: [
                    moddle.create('bpsim:ParameterValue', { text: values?.[identifier] ? values?.[identifier] : "" })
                ],
            })]
            const options = {}
            options.elementRef = element.id
            options[parentElement] = [moddle.create(`bpsim:${capitalize(parentElement)}`, childOptions)]

            // TODO: see if there are any existing entries wit the same id, if so then merge these together

            const scenario = extensionElements.values[0].scenario[0]
            if (!scenario?.elementParameters) {
                scenario.elementParameters = []
                console.log("there are no ElementParameters, initialize new")
                scenario.elementParameters.push(moddle.create('bpsim:ElementParameters', options))
            }
            else {
                // get index of element with matching elementRef
                const elementIndex = scenario.elementParameters.findIndex(e => e.elementRef === element.id)
                if (elementIndex > -1) {
                    console.log("found existing entry for element with id", element.id)
                    const newParentElement = [moddle.create(`bpsim:${capitalize(parentElement)}`, childOptions)]
                    const newChildElement = [moddle.create(`bpsim:${capitalize(childElement)}`, {
                        resultRequest: [
                            moddle.create('bpsim:ResultRequest')
                        ],
                        parameterValue: [
                            moddle.create('bpsim:ParameterValue', { text: values?.[identifier] ? values?.[identifier] : "" })
                        ],
                    })]
                    const existingElement = scenario.elementParameters[elementIndex]

                    //instead og merging the object we can add the new moddle object as an attribute directly 
                    if (!values?.[identifier]) {
                        delete scenario.elementParameters[elementIndex][parentElement][0][childElement]
                        // TODO: if the parentElement is empty then delete this also

                    }
                    else {
                        if (scenario.elementParameters[elementIndex][parentElement]) {
                            scenario.elementParameters[elementIndex][parentElement][0][childElement] = newChildElement
                        }
                        else {
                            scenario.elementParameters[elementIndex][parentElement] = newParentElement
                        }
                    }
                }
                else {
                    console.log("array exists, but there are no pre-existing elements with matching id")
                    scenario.elementParameters.push(moddle.create('bpsim:ElementParameters', options))
                }
            }

            return {
                cmd: 'properties-panel.update-businessobject',
                context: {
                    element: element.businessObject.$parent,
                    businessObject: element.businessObject.$parent,
                    properties: { extensionElements: extensionElements }
                }
            }
        };
    };

    var elementDocuEntry = entryFactory[type](translate, {
        id: identifier,
        label: translate(childElement),
        modelProperty: identifier
    });

    elementDocuEntry.get = getValue(getBusinessObject(element));
    elementDocuEntry.set = setValue(getBusinessObject(element));
    group.entries.push(elementDocuEntry);

}





export default factory



