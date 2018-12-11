'use strict'
const express = require('express')
const superagent =require('superagent')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
require('dotenv').config()



app.use(cors())
app.get('/location',(req, res)=> 
{
  const url= 
  `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key= ${process.env.GOOGLE_API_KEY}`
  superagent.get(url)
  .then(result=>{
    res.send({
      longtitude:
      result.body.results[0]
      .geometry.location.lng,
      latitude:
      result.body.results[0]
      .geometry.location.lat
    })
  })
  .catch(err=>res.send('Got an error'))})

app.get('/', (req,res)=>{
res.send('<h1>This is the Correct route</h1>')
})

app.get('*', (req, res) => 
  res.send('500 error message'))



app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})




















// app.use('*', (req,res) => {
//   res.send('something Broke')
// })