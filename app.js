const express = require("express")
require("dotenv").config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const api = process.env.API

const app = express()


// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
app.use(morgan('tiny'))



app.post(`/${api}/products`, (req, res) => {
  const product = req.body
  console.log(product)
})


mongoose.connect('mongodb+srv://nikhil:nikhil9526@cluster0.8ztji4t.mongodb.net/eshop?retryWrites=true&w=majority')
.then(() => {
  console.log('conecte to batabase..')
})
.catch((err) => {
  console.log(err)
})

app.listen(4000, (req, res) => {
  console.log("listing to port 4000")
  console.log(api)
})
