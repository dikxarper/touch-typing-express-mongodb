const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/", (req, res) => {
  User.find({}, function (err, user) {
    if (err) console.log(err)
    res.render("admin_panel", {
      user: user,
    })
  })
})

module.exports = router
