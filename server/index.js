const express = require("express");
const fs = require("fs"); 
const convert = require("xml-js");
const app = express();
const port = 3050;

// read xml file
// parse xml to json
// send json file
app.get("/init", (req, res) => {
  let data = "";
  try {
    data = fs.readFileSync("../static/init.bpmn", "utf8");
    res.status(200).send(data);
  } catch (error) {
      console.error(error)
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
