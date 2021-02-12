import Stats from "../../helper";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../scss/pages.module.scss";

//"https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/resources/pizza-collaboration.bpmn"

const First = (props) => {
  const [url, setUrl] = useState(
    "https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/resources/pizza-collaboration.bpmn"
  );
  const {
    state: { model, handleChange },
  } = props;


  useEffect(async () => {
    var config = {
      method: 'get',
      url: '/api/init',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
     
     
  },[]);



  const getModel = async () => {
    if (!url) alert("please specify a value");
    let response;
    try {
      response = await axios.get(url);
      handleChange(response.data);
      console.info(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.content} ${styles.center}`}>
      <div>
        <h3 className="text-center">
          Create base model from log data or from scratch
        </h3>
        <div style={{ width: "30vw", margin: "auto" }}>
          <Stats step={2} title={"Create model from log data"} {...props} />
          <Stats step={3} title={"Create model from scratch"} {...props} />
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="model url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => getModel()}
              >
                GET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default First;

//updata url via input
//onclick get model at url and store in data
//then log results
