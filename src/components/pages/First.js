import Stats from "../../helper";
import React from "react";
import styles from "../../scss/pages.module.scss";
const First = (props) => {
  return (
    <div className={`${styles.content} ${styles.center}`}>
      <div>
        <h3 className="text-center">
          Create base model from log data or from scratch
        </h3>
        <div style={{ width: "30vw", margin: "auto" }}>
          <Stats step={2} title={"Create model from log data"} {...props} />
          <Stats step={3} title={"Create model from scratch"} {...props} />
        </div>
      </div>
    </div>
  );
};
export default First;
