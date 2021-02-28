import extHelper from "bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import UpdateBusinessObjectHandler from "bpmn-js-properties-panel/lib/cmd/UpdateBusinessObjectHandler";

/**
 * add support for getter
 * add support for setter
 * add support for creating a new element
 *  initializing a new elememt in new model
 *  this includes adding new extension element and bpsim elent and THEM the scenario element
 */

const scenarioHelper = {};
var currentId = undefined;

/**
 * get the current active scenario
 */
/**
 * @param  {} element
 * return id of current scenario or nothing
 */
scenarioHelper.getScenario = (element) => {
    const extensionElements = element?.businessObject?.extensionElements?.values
    if (!extensionElements) {
        return undefined
    }
    else {
        const bpsim = extensionElements[0]
        const scenarios = bpsim.scenario;
        if (scenarios.length === 1 || !currentId) {
            currentId = scenarios[0].id
            return scenarios[0]
        }
        else {
            //filter out the correct scenario and set id accordingly
            const currentScenario = scenarios.filter(scenario => scenario.id === currentId)
            currentId = currentScenario.id
            return currentScenario[0]
        }
    }
}


export default scenarioHelper;
