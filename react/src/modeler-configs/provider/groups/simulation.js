import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
export default function createGroups({ element, bpmnFactory, canvas, elementRegistry, translate, }) {
    var scenarioGroup = {
        id: "scenario",
        label: "Scenario",
        entries: [],
    };

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

    return [scenarioGroup];
}