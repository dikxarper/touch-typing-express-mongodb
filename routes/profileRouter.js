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

router.get("/guest/:id", (req, res) => {
    User.findById({ _id: req.params.id }, function (err, user) {
        if (err) console.log(err)
        
        for (let i = 0; i < user.friends.length; i++) {
            console.log(user.friends[i])
            if (user.friends[i] === req.cookies.id) {
                res.render("profile_guest", { user: user, is_friend: true })
            }
        }

        res.render("profile_guest", {
          user: user, is_friend: false
        })
      })
})

router.get("/data", (req, res) => {
  Stat.find({}, (err, salesData) => {
    if (err) return console.error(err)
    const dates = salesData.map((data) => data.date)
    const accur = salesData.map((data) => data.accuracy)
    const wpm = salesData.map((data) => data.word_count / data.time)
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
