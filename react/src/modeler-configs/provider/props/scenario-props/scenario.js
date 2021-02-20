import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import extHelper from "bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export default function (group, element, bpmnFactory, translate) {









  var getValue = function () {
    return function (element) {
      // get all extensionElements that are children of the current element
      const values = element?.businessObject?.extensionElements?.values
      const comments = values ? values.filter(e => e.$type === "qa:Comment") : []
      const comment = comments[0]?.text
      return { comment: comment };
    };
  };

  const setValue = function (businessObject) {
    return function (element, values) {
      var commentElement = extHelper.getExtensionElements(businessObject, "qa:Comment")
      var extElement = businessObject.get("extensionElements")
      if (extElement && commentElement) {
        // modify existing element by first pulling it down and mutating it directly
        commentElement[0].text = values.comment
        return cmdHelper.updateBusinessObject(element, getBusinessObject(element));
      }
      else {
        // create new element
        commentElement = elementHelper.createElement("qa:Comment", {}, businessObject, bpmnFactory);
        commentElement.text = values.comment
        // add entry to the extensionElements wrapper
        // this is automatically created if it does not exist
        let extensionAddResult = extHelper.addEntry(
          businessObject,
          element,
          commentElement,
          bpmnFactory
        );
        // update the actual businessObj
        return cmdHelper.updateBusinessObject(
          element,
          getBusinessObject(element),
          extensionAddResult
        );

      }
    };
  };

  var elementDocuEntry = entryFactory.textBox(translate, {
    id: 'scenario',
    label: translate('scenario documentation'),
    modelProperty: 'comment'
  });

  elementDocuEntry.set = setValue(getBusinessObject(element))

  elementDocuEntry.get = getValue(getBusinessObject(element));

  group.entries.push(elementDocuEntry);


}
