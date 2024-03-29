const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Stat = require("../models/stats")
const User = require("../models/user")

router.get("/:id", (req, res) => {
  User.findById({ _id: req.params.id }, function (err, user) {
    if (err) console.log(err)

    res.render("profile", {
      user: user,
    })
  })
})

router.get("/:id/chartData", (req, res) => {
  console.log(req.cookies.id)
  Stat.find({ user_id: { _id: req.cookies.id } }, (err, salesData) => {
    if (err) return console.error(err)
    const dates = salesData.map((data) => data.date)
    const accur = salesData.map((data) => data.accuracy)
    const wpm = salesData.map((data) => data.wpm)
    const cons = salesData.map((data) => data.consistency)
    const raw = salesData.map((data) => data.raw)
    res.json({ dates, accur, wpm, cons, raw })
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
