const express = require("express")
const app = express()

require("dotenv").config()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")
const products = require("./models/product")
const productRouter = require('./routs/productrout')
const categoryRouter = require('./routs/categoryrout')
const userRouter = require('./routs/userRout')
const cors = require('cors')
const authJwt = require('./helper/jwt')
const api = process.env.API
const URI = process.env.CONNECTION_URI
const PORT = 4000
app.use(cors())
app.options('*', cors())



// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use(authJwt())

app.use(`/${api}/products`, productRouter)
app.use(`/${api}/category`, categoryRouter)
app.use(`/${api}/users`, userRouter)



// mongoose
//   .connect(
//     "mongodb+srv://nikhil:nikhil9526@cluster0.8ztji4t.mongodb.net/eshop?retryWrites=true&w=majority"
//   )
mongoose.connect(URI)
  .then(() => {
    console.log("conecte to Database..")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(PORT, (req, res) => {
  console.log(`server listining to http://localhost:${PORT}/`)
  console.log(api)
})
