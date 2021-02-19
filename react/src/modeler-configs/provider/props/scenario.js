import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import extHelper from "bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper";
import elementHelper from "bpmn-js-properties-panel/lib/helper/ElementHelper";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export default function (group, element, bpmnFactory, translate, moddle) {


  /* 
  every click event in the modeler is propagated to through the provider
  This allows for us to hook onto this event and do with it as we please

  Here we can check the type of the element and update out fields in the properties panel accordingly -> GETTER

  The element also has other attributes that describe where it lies in the xml document og element hierarchy.
  Mearning that we can add new elements as siblings of the currently selected or as children.

  Its slighly confusing becasue it is a very generic way of dealing with it, i.e, it exposes a complex object.
  Its the correct way because its very flexible
  
  
  */

  /*
  
  TODO: render the contents of the comment element in textbox
  TODO: update contents

  TODO: update attribute
  
  */


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

  if (element?.type == "bpmn:Task") {
    var elementDocuEntry = entryFactory.textBox(translate, {
      id: 'scenario',
      label: translate('scenario documentation'),
      modelProperty: 'comment'
    });

    elementDocuEntry.set = setValue(getBusinessObject(element))

    elementDocuEntry.get = getValue(getBusinessObject(element));

    group.entries.push(elementDocuEntry);
  }


}

/*

  const setValue = function (businessObject, property) {
    return function (element, values) {
      let newMailElement;
      if (
        !businessObject.get("extensionElements") &&
        !extHelper.getExtensionElements(businessObject, "exp:mail")
      ) {
        newMailElement = elementHelper.createElement(
          "exp:mail",
          values,
          businessObject,
          bpmnFactory
        );
        let extensionAddResult = extHelper.addEntry(
          businessObject,
          element,
          newMailElement,
          bpmnFactory
        );
        return cmdHelper.updateBusinessObject(
          element,
          getBusinessObject(element),
          extensionAddResult
        );
      } else {
        // why doesnt it check if it has the extensionElements wrapper


        let extendionElements = extHelper.getExtensionElements(
          businessObject,
          "exp:mail"
        );
        if (extendionElements) {
          extendionElements[0][property] = values[property];
          return cmdHelper.updateBusinessObject(
            element,
            getBusinessObject(element),
            extendionElements
          );
        } else {
          newMailElement = elementHelper.createElement(
            "exp:mail",
            values,
            businessObject,
            bpmnFactory
          );
          return extHelper.addEntry(
            businessObject,
            element,
            newMailElement,
            bpmnFactory
          );
        }
      }
    };
  };

*/