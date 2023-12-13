const express = require('express')
const router = express.Router()
const products = require('../models/product')

router.get('', async (req, res) => {
    const productlist = await products.find()
    if(!productlist){
      res.status(500)
      .json({sucess:false})
    }else{
    res.send(productlist)
  }
  })
  
  router.post('', async (req, res) => {
    try {
       const product = await products.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
        
      })
      console.log(product)
  
      
    } catch (error) {
      console.log(error.message)
    }
  
   
  })

  module.exports = router
