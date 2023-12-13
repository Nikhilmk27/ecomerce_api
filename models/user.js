const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
   
  },
  isadmin: {
    type: Boolean,
    default: false
  },
  street: {
    type: String,
    required: true
    
  },
  apartment: {
    type: String,
    required: true
    
  },
  pincode: {
    type: String,
    required: true
   
  },
  country: {
    type: String,
    required: true
   
  }
})
const users = mongoose.model("users", userSchema)
module.exports = users
