/* eslint-disable react/prop-types */
import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import Nav from "./nav";
import transitions from "../scss/transitions.module.scss";
import First from "./pages/First";
import Modeler from "./pages/Modeler";
import Miner from "./pages/Miner";

/**
 * A basic demonstration of how to use the step wizard
 */
const Wizard = (props) => {
  const [state, updateState] = useState({
    form: {},
    transitions: {
      enterRight: `${transitions.animated} ${transitions.enterRight}`,
      enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
      exitRight: `${transitions.animated} ${transitions.exitRight}`,
      exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
      intro: `${transitions.animated} ${transitions.intro}`,
    },
    // demo: true, // uncomment to see more
  });

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;
    updateState({
      ...state,
      form,
    });
  };

  // Do something on step change
  const onStepChange = (stats) => {
    // console.log(stats);
    //can for example save data to db
  };

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    });

  return (
    <StepWizard
      onStepChange={onStepChange}
      isHashEnabled
      transitions={state.transitions} // comment out for default transitions
      nav={<Nav />}
      instance={setInstance}
    >
      <First
        hashKey={"FirstStep"}
        update={updateForm}
        styles={{ height: "96vh" }}
      />
      <Miner styles={{ height: "96vh" }} />
      <Modeler handleModelChange={props.handleModelChange} />
    </StepWizard>
  );
};

export default Wizard;
