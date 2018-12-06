'use strict'
const express = require('express')
const superagent =require('superagent')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 3000
app.use(cors())
app.get('/location',(req, res)=> {
  const url= `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}`
  //$ 
  console.log(req.query)
  superagent.get(url)
  .then(result=>{
    res.send(new Location(result)) 
  })
  .catch(err=>res.send(err))
})

// app.get('/weather',(req,res)=>{
//   const url =`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.lat}, ${req.query.lng}`
// })

// app.get('/yelp', (req,res)=>{
//   const URL = `https://api.yelp.com/v3/businesses/search${req.query.Location}&key=${process.env.YELP_API_KEY}`
//   console.log(req.query)
//   supperagent.get(URL)
//   .then(result2=>{
//     res.send(new business(result2))
//   })
// })
  app.get('/', (req,res)=>{
  res.send('<h1>This is the Correct route</h1>')
})
app.get('*', (req, res) => 
  res.send('500 error message'))
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})
const Location = function(loc){
  this.lat = loc.body.results[0]
  .geometry.location.lat
  this.log = loc.body.results[0]
  .geometry.location.lng
}

// const business = function(biz){
//   this.title = biz.body,businesses[0].categories.title
// }




















// app.use('*', (req,res) => {
//   res.send('something Broke')
// })




// app.get('/yelp', (req,res)=>{
//   const URL = `https://api.yelp.com/v3/businesses/search${process.env.YELP_API_KEY}/$req.query.lat},${req.query.lng}`
//   console.log(req.query)
//   supperagent.get(URL)
//   .then(result2=>{
//     res.send(new business(result2))
//   })
// })
  









// app.use('*', (req,res) => {
//   res.send('something Broke')
// })