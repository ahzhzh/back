const express = require('express')
const app = express()
const port = 8080

app.post('/login', (req, res) => {
  //console.log(id, pwd)
  res.send("login")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
