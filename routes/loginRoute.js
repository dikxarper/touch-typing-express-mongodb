const express = require("express")
const passport = require("passport")
const { check } = require("express-validator")

const router = express.Router()

router.get("/login", (req, res) => {
  res.render("authorization/login")
})

router.post("/login", passport.authenticate("local"), (req, res) => {})

router.get("/register", (req, res) => {
  res.render("authorization/register")
})

router.post("/register", (req, res) => {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    country: req.body.country,
    organization: req.body.organization,
    city: req.body.city,
  })

  
})

module.exports = router
