/* eslint-disable react/prop-types */
import React, {useContext} from "react";
import {ModelerContext} from "../app";

export default function Component()  {
  const modelMeta = useContext(ModelerContext )
  return (
      <div>
        <p>{modelMeta}</p>
      </div>
  );
}
