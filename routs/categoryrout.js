const categories = require("../models/category")
const express = require("express")
const router = express.Router()

router.get("", async (req, res) => {
  const categoryList = await categories.find()
  if (!categoryList) {
    res.status(500).json({ sucess: false })
  } else {
    res.status(200).send(categoryList)
  }
})
// find category by id
router.get("/:id", async (req, res) => {
  const categoryId = req.params.id
  const category = await categories.findById(categoryId)
  if (!category) {
    res.status(500).json({ message: "the category with given id is not found" })
  } else {
    res.status(200).send(category)
  }
})
// router to update category
router.put("/:id", async (req, res) => {
  const categoryId = req.params.id
  const category = await categories.findByIdAndUpdate(categoryId, {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color
  },{new:true}
  )
  if (!category) {
    return res.status(400).send("the category canot be created")
  } else {
    res.send(category)
  }
})
router.post("", async (req, res) => {
  try {
    const category = await categories.create({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    })
    console.log(category)
    if (!category) {
      res.status(404).json("the ategory canot be created")
    } else {
      res.send(category)
    }
  } catch (error) {
    console.log(error)
  }
})
router.delete("/:id", (req, res) => {
  const categoryId = req.params.id

  categories
    .findByIdAndDelete(categoryId)
    .then((deletedCategory) => {
      if (!deletedCategory) {
        // Handle case where category with given ID was not found
        res.status(404).json({ error: "Category not found" })
        return
      }
      res.status(200).json({ message: "Category deleted successfully" })
    })
    .catch((err) => {
      // Handle any errors that occurred during deletion
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message })
    })
})

module.exports = router
