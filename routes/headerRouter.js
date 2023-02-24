const express = require("express")
const router = express.Router()

router.get("/partials/header", (req, res) => {
  const userId = req.cookies.userId

  let header = "<div class='navbar_profile'>"
  if (userId) {
    header += '<a href="/logout">Logout</a>'
  } else {
    header += '<a href="/login">Login</a>'
  }
  navbar += "</div>"

  res.send(header)
})

module.exports = router
