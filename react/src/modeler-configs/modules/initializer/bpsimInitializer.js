import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import extHelper from "bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export default function BpsimInitializer(eventBus, bpmnFactory, canvas, elementRegistry, translate, moddle, commandStack) {

    const initializeScenario = (bo) => {
        // run down the tree and check if scenario and its required children exist
        // create any missing element. Should result in an empty scenario that is ready for new elements


    }

    console.log(eventBus)
    let isImportDone = false
    let bo;

    eventBus.on('import.done', (event) => {
        isImportDone = true;
    });

    eventBus.on('element.hover', (event) => {
        if (isImportDone && !bo) {
            bo = getBusinessObject(event.element)
            if (bo) console.log(bo)

            const initialiseScenario = initializeScenario(bo)

        }
    });



}
