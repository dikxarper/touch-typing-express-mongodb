const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const { validationResult, check } = require("express-validator")

const User = require("../models/user")

router.get("/login", (req, res) => {
  res.render("authorization/login")
})

router.post("/login", async (req, res) => {
  try {
    // Validate user credentials and retrieve user ID

    const { username, password } = req.body
    const user = await User.findOne({ username: username })

    if (!user) return res.status(400).json({ message: "The user is not found" })
    const valPassword = bcrypt.compareSync(password, user.password)
    if (!valPassword)
      return res.status(400).json({ message: "Password is not correct" })
    if (user.role == "admin") {
      res.redirect("/admin")
    } else {
      res.cookie("userRole", user.role)
      res.cookie("username", username)
      res.cookie("userId", user._id)
      req.session.userId = user._id
      console.log(req.session.userId)

      res.redirect(`profile/${user._id}`)
    }
  } catch (e) {
    console.log(e)
  }
})

router.get("/register", (req, res) => {
  res.render("authorization/register")
})

router.post(
  "/register",
  [
    check("password", "Password must be at least 7 characters")
      .exists()
      .matches(/.{7,}/),
  ],
  async (req, res) => {
    try {
      //validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const alert = errors.array()
        res.render("authorization/register", {
          alert,
        })
      } else {
        const { username, email, password, organization, country } = req.body
        const emailCheck = await User.findOne({ email: email })
        if (emailCheck)
          return res.status(400).json({ message: "Email already exists" })
        else {
          const hashPassword = bcrypt.hashSync(password, 7)
          console.log(hashPassword)
          let newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
            country: country,
            organization: organization,
          })

          newUser = await newUser.save()

          const emailCookie = encodeURIComponent(email)
          res.cookie("email", emailCookie)
          res.cookie("id", newUser._id)

          User.findOne({}, (err, user) => {
            console.log(user)
          })

          res.redirect(`/profile/${newUser._id}`)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
)

router.get("/logout", (req, res) => {
  res.clearCookie("userId")
  res.clearCookie("id")
  res.clearCookie("username")
  res.clearCookie("userRole")

  req.app.locals.user = ""

  req.session.destroy(function (err) {
    res.redirect("/login")
  })
})

module.exports = router
