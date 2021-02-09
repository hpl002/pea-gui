/* eslint-disable react/prop-types */
import React from 'react';
const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
    title="no title"
  }) => (
    <div style={{"marginTop": "2%", "marginBottom": "2%"}}>     
  {step === "next" ? (
        <button className="btn btn-info btn-block" onClick={nextStep}>
          {title}
        </button>
      ) : (
        <button className="btn btn-info btn-block" onClick={() => goToStep(step)}>
          {title}
        </button>
      )}
    </div>
  );

export default Stats