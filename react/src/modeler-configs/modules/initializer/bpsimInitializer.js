import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import extHelper from "bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { v4 as uuidv4 } from 'uuid';

export default function BpsimInitializer(eventBus, bpmnFactory, canvas, elementRegistry, translate, moddle, commandStack) {

    /*
    
    - get the entire businessObject
    
    
    
    
    
    */


    // create the required elements and attach them onto the extensionElement, and then updated the model with this
    // https://github.com/bpmn-io/bpmn-moddle/blob/ed12e4ae47a34de59481e8e8f7d912443d04d17c/test/spec/bpmn-moddle.js#L187

    //https://github.com/bpmn-io/bpmn-moddle/blob/master/test/spec/xml/write.js
    const initializeScenario = ({ bo, element }) => {
        var updates = []

        // get the extensionElement
        var extensionElements = bo.get('extensionElements');

        // bpsimdata
        // scenario
        // ScenarioParameters
        // ElementParameters
        // Calendar(optional)
        // VendorExtension(optional)

        // create extensionElement if it does not exist
        if (!extensionElements) {

            const scenarioParameters = moddle.create('bpsim:ScenarioParameters', {
                start: [
                    moddle.create('bpsim:Start', { parameterValue: [moddle.create("bpsim:ParameterValue")] })
                ],
                duration: [
                    moddle.create('bpsim:Duration', { parameterValue: [moddle.create("bpsim:ParameterValue")] })
                ],
                warmup: [
                    moddle.create('bpsim:Warmup', { parameterValue: [moddle.create("bpsim:ParameterValue")] })
                ],
            });

            const scenario = moddle.create('bpsim:Scenario', {
                id: uuidv4().split("-")[0],
                scenarioParameters: [
                    scenarioParameters
                ],

            })


            const bpsim = moddle.create('bpsim:BPSimData', {
                scenario: [
                    scenario
                ],
            })

            extensionElements = moddle.create('bpmn:ExtensionElements', {
                values: [bpsim]
            });








            updates.push({
                cmd: 'properties-panel.update-businessobject',
                context: {
                    element: element,
                    businessObject: bo,
                    properties: { extensionElements: extensionElements }
                }
            })





        }
        return updates
    }

    let isImportDone = false
    let bo;

    eventBus.on('import.done', (event) => {
        isImportDone = true;
    });

    eventBus.on('element.hover', (event) => {
        var element = event.element
        if (isImportDone && !bo) {
            bo = getBusinessObject(element)
            if (bo) {
                const elementStructure = initializeScenario({ bo, element })
                elementStructure.forEach(element => {
                    const { cmd } = element
                    const { context } = element
                    commandStack.execute(cmd, context)
                });
            }
        }
    });



}
