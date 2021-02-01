/* eslint-disable react/prop-types */
import React from "react";
 

export default function Component(props) {   
  const { state: { model, setModel } } = props;
  return (
    <div>
        The answer is {model}.                  
        <button onClick={()=>{setModel("some new value kajnsdkaknsd")}}> BUTTON{model}</button>
    </div>
  );
}
