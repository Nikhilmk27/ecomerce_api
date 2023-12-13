const express = require("express")
const router = express.Router()
const users = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// rout to create user
router.post("", async (req, res) => {
  try {
    const user = await users.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isadmin: req.body.isadmin,
      street: req.body.street,
      apartment: req.body.apartment,
      pincode: req.body.pincode,
      country: req.body.country,
    })
    console.log(user)
    if (!user) {
      res.status(404).json("user canoy be created")
    } else {
      res.send(user)
    }
  } catch (error) {
    console.log(error)
  }
})

router.get("", async (req, res) => {
  const userList = await users.find().select("-password")
  if (!userList) {
    res.status(500).json({ sucess: false })
  } else {
    res.status(200).send(userList)
  }
})
router.get("/:id", async (req, res) => {
  const userId = req.params.id
  const user = await users.findById(userId).select("-password")
  if (!user) {
    res.status(500).json({ message: "the category with given id is not found" })
  } else {
    res.status(200).send(user)
  }
})
router.post("/login", async (req, res) => {
  try {
    const secret = process.env.secret
    const user = await users.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
      return res.status(400).send("the user not found")
    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({userId: user._id }, secret, {expiresIn: '1d'})

      res.status(200).send({user: user.email, token:token})
    } else {
      res.status(400).send("wrong password")
    }
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
