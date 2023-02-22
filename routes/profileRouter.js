const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const User = require("../models/user")

router.get("/:id", (req, res) => {
  User.findById({ _id: req.params.id }, function (err, user) {
    if (err) console.log(err)

    res.render("profile", {
      user: user,
    })
  })
})

router.get("/:id/edit", (req, res) => {
  User.findById({ _id: req.params.id }, function (err, user) {
    if (err) console.log(err)

    res.render("profile_edit", {
      user: user,
    })
  })
})

router.post("/:id/edit", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    function (err, user) {
      if (err) console.log(err)

      res.redirect(`/profile/${user._id}`)
    }
  )
})

router.post("/:id/delete", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, function (err, user) {
    if (err) console.log(err)

    res.redirect("/admin")
  })
})

module.exports = router
