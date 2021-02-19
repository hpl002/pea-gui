import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import documentationProps from "../props/scenario"
export default function createGroups({ element, bpmnFactory, canvas, elementRegistry, translate, moddle }) {
    var scenarioGroup = {
        id: "scenario",
        label: "Scenario",
        entries: [],
    };

    // ensure that you do not have any conflicting id. This goes for all tabs. 
    // it will not throw any explicit erorrs

    documentationProps(scenarioGroup, element, bpmnFactory, translate, moddle);

    /*
    scenarioGroup.entries.push(
        entryFactory.textField(translate, {
            id: "id",
            description: "Scenario identifier",
            label: "Id",
            modelProperty: "scenario_id",
        })
    );
    
    
    scenarioGroup.entries.push(
        entryFactory.textField(translate, {
            id: "name",
            description: "Scenario name",
            label: "Name",
            modelProperty: "scenario_name",
        })
    );
    
    
    scenarioGroup.entries.push(
        entryFactory.textField(translate, {
            id: "scenario_documentation",
            description: "Scenario documentation",
            label: "Documentation",
            modelProperty: "bpmn:documentation",
        })
        );
        */


    return [scenarioGroup];
}