const express = require("express")
const passport = require("passport")
const { check } = require("express-validator")
const router = express.Router()

const User = require("../models/user")

router.get("/login", (req, res) => {
  res.render("authorization/login")
})

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/")
})

router.get("/register", (req, res) => {
  res.render("authorization/register")
})

router.post("/register", (req, res) => {
  //data variables
  const username = req.body.username
  const email = req.body.email
  const country = req.body.country
  const organization = req.body.organization
  const password = req.body.password

  //creating newUser
  var newUser = new User({
    username: username,
    email: email,
    country: country,
    organization: organization,
  })

  //saving in cookie
  res.cookie("username", username)
  res.cookie("email", email)
  res.cookie("password", password)

  User.register(newUser, password, function (err, a) {
    if (err) {
      console.log(err)
      return res.redirect("/register")
    }

    passport.authenticate("local")(req, res, function () {
      return res.redirect("/")
    })
  })
})

module.exports = router
