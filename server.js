'use strict'
const express = require('express')
const superagent =require('superagent')
const mongoose=require('mongoose')

const {Schema, model } = mongoose
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ds227664.mlab.com:27664/practice-server`
mongoose.connect(mongoURL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=>{
  console.log('DB connection open!')
})

const PORT = process.env.PORT || 3000
app.use(cors())
//app.get('/yelp', yelpController)
app.get('/weather', weatherController)
app.get('/location',(req, res)=> {
  const url= `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}`
  
  Area.findOne({address:req.query.address}, (err,addr)=>{
   if(addr){
     console.log('address found')
     res.send(addr)

   } else{

   
  //$ 
  console.log(req.query)
  superagent.get(url)
  .then(result=>{
    const newArea = new Area({

      //const Location = function(loc){
        address:req.query.address,
        lat: result.body.results[0]
        .geometry.location.lat,
        lng: result.body.results[0]
        .geometry.location.lng
    })
    newArea.save()
    console.log('created new address')
    res.send( newArea) 

  })
}
})
  .catch(err=>res.send(err))
})

 const WeatherConstractor = function(weather){
   this.summary = weather.body.currently.summary
   this.icon = weather.body.currently.icon
   this.temp = weather.body.currently.temperature
 }
 function weatherController(req,res){
  const url =`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${req.query.lat},${req.query.lng}`
  superagent.get(url)
  .then(result=>{
    const newWeather = new WeatherConstractor(result)
    res.send(newWeather)
  })
 }
//  const yelpConstractor = function(weather){
//   this.summary = weather.body.currently.summary
//   this.icon = weather.body.currently.icon
//   this.temp = weather.body.currently.temperature
// }
// function yelpController(req,res){
//  const url =`https://api.yelp.com/v3/businesses/{id}/${process.env.YELP_API_KEY}/${req.query.lat},${req.query.lng}`
//  superagent.get(url)
//  .then(result=>{
//    const newWeather = new yelpConstractor(result)
//    res.send(newWeather)
//  })
// }
//   //function yelpController(req,res){}




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
const LocationSchema = new Schema({
  address:String,
  lat: Number,
  lng: Number
})
const  Area = model('Area', LocationSchema)

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