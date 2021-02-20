'use strict';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { table } from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import { createElement } from 'bpmn-js-properties-panel/lib/helper/ElementHelper';
import { removeEntry } from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';
import { updateBusinessObject, addAndRemoveElementsFromList, addElementsTolist, removeElementsFromList } from 'bpmn-js-properties-panel/lib/helper/CmdHelper';
import { nextId, isIdValid } from "bpmn-js-properties-panel/lib/Utils"


import assign from 'lodash/assign';
import forEach from 'lodash/forEach';
import find from 'lodash/find';

function generatePropertyId() {
    return nextId('Property_');
}

/**
 * Get all camunda:property objects for a specific business object
 *
 * @param  {ModdleElement} parent
 *
 * @return {Array<ModdleElement>} a list of camunda:property objects
 */
function getPropertyValues(parent) {
    var properties = parent && getPropertiesElement(parent);
    if (properties && properties.values) {
        return properties.values;
    }
    return [];
}

/**
 * Get all camunda:Properties object for a specific business object
 *
 * @param  {ModdleElement} parent
 *
 * @return {ModdleElement} a camunda:Properties object
 */
function getPropertiesElement(element) {
    if (!isExtensionElements(element)) {
        return element.properties;
    } else {
        return getPropertiesElementInsideExtensionElements(element);
    }
}

/**
 * Get first camunda:Properties object for a specific bpmn:ExtensionElements
 * business object.
 *
 * @param {ModdleElement} extensionElements
 *
 * @return {ModdleElement} a camunda:Properties object
 */
function getPropertiesElementInsideExtensionElements(extensionElements) {
    return find(extensionElements.values, function (elem) {
        return is(elem, 'camunda:Properties');
    });
}

/**
 * Returns true, if the given business object is a bpmn:ExtensionElements.
 *
 * @param {ModdleElement} element
 *
 * @return {boolean} a boolean value
 */
function isExtensionElements(element) {
    return is(element, 'bpmn:ExtensionElements');
}

/**
 * Create a camunda:property entry using tableEntryFactory
 *
 * @param  {djs.model.Base} element
 * @param  {BpmnFactory} bpmnFactory
 * @param  {Object} options
 * @param  {string} options.id
 * @param  {Array<string>} options.modelProperties
 * @param  {Array<string>} options.labels
 * @param  {function} options.getParent Gets the parent business object
 * @param  {function} options.show Indicate when the entry will be shown, should return boolean
 */
export default function (element, bpmnFactory, options, translate) {

    var getParent = options.getParent;

    var modelProperties = options.modelProperties,
        createParent = options.createParent;

    var bo = getBusinessObject(element);
    if (is(element, 'bpmn:Participant')) {
        bo = bo.get('processRef');
    }

    // build properties group only when the participant have a processRef
    if (!bo) {
        return;
    }

    assign(options, {
        addLabel: translate('Create new bpsim:Scenario'),

        getElements: function (element, node) {

            return [{ name: "scenario name", value: "scenario value" }]
            /* var parent = getParent(element, node, bo);
            return getPropertyValues(parent); */
        },
        addElement: function (element, node) {
            var commands = [],
                parent = getParent(element, node, bo);

            if (!parent && typeof createParent === 'function') {
                var result = createParent(element, bo);
                parent = result.parent;
                commands.push(result.cmd);
            }

            var properties = getPropertiesElement(parent);
            if (!properties) {
                properties = createElement('camunda:Properties', {}, parent, bpmnFactory);

                if (!isExtensionElements(parent)) {
                    commands.push(updateBusinessObject(element, parent, { 'properties': properties }));
                } else {
                    commands.push(addAndRemoveElementsFromList(
                        element,
                        parent,
                        'values',
                        'extensionElements',
                        [properties],
                        []
                    ));
                }
            }

            var propertyProps = {};
            forEach(modelProperties, function (prop) {
                propertyProps[prop] = undefined;
            });

            // create id if necessary
            if (modelProperties.indexOf('id') >= 0) {
                propertyProps.id = generatePropertyId();
            }

            var property = createElement('camunda:Property', propertyProps, properties, bpmnFactory);
            commands.push(addElementsTolist(element, properties, 'values', [property]));

            return commands;
        },
        updateElement: function (element, value, node, idx) {
            var parent = getParent(element, node, bo),
                property = getPropertyValues(parent)[idx];

            forEach(modelProperties, function (prop) {
                value[prop] = value[prop] || undefined;
            });

            return updateBusinessObject(element, property, value);
        },
        validate: function (element, value, node, idx) {

            // validate id if necessary
            if (modelProperties.indexOf('id') >= 0) {

                var parent = getParent(element, node, bo),
                    properties = getPropertyValues(parent),
                    property = properties[idx];

                if (property) {

                    // check if id is valid
                    var validationError = isIdValid(property, value.id, translate);

                    if (validationError) {
                        return { id: validationError };
                    }
                }
            }
        },
        removeElement: function (element, node, idx) {
            var commands = [],
                parent = getParent(element, node, bo),
                properties = getPropertiesElement(parent),
                propertyValues = getPropertyValues(parent),
                currentProperty = propertyValues[idx];

            commands.push(removeElementsFromList(element, properties, 'values', null, [currentProperty]));

            if (propertyValues.length === 1) {

                // remove camunda:properties if the last existing property has been removed
                if (!isExtensionElements(parent)) {
                    commands.push(updateBusinessObject(element, parent, { properties: undefined }));
                } else {
                    forEach(parent.values, function (value) {
                        if (is(value, 'camunda:Properties')) {
                            commands.push(removeEntry(bo, element, value));
                        }
                    });
                }
            }

            return commands;
        }
    });

    return table(translate, options);
}
