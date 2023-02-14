const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/", (req, res) => {
  User.find({}, (err, user) => {
    res.render("leadBoard", {
      user: user,
    })
  })
})

module.exports = router
