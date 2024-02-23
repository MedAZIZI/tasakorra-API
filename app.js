const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({
    Title: 'Tasakorra',
    Description: 'This is an API for Tasakorra',
    Date: Date.now(),
  })
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})