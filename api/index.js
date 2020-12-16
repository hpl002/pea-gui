const express = require('express')
const app = express()
 
app.get('/api/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3010)