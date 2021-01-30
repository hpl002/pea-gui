import Stats from "../../helper"
import React from 'react';
const First = (props) => {
  return (
    <div>
      <h3 className="text-center">
        Create base model from log data or from scratch
      </h3>
      <div style={{ width: "30vw", margin: "auto" }}>
        <Stats step={2} title={"Create model from log data"} {...props} />
        <Stats step={3} title={"Create model from scratch"} {...props} />
      </div>
    </div>
  );
};

export default First;