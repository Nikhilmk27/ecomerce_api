const mongoose = require("mongoose")
// define the schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  richDescription: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  images: [
    {
      type: String
    }
  ],
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 200
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
})
// ceate a model base on the schema
const product = mongoose.model("products", productSchema)
// exports the model
module.exports = product
