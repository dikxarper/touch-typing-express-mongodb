const express = require("express")
const router = express.Router()
const Stat = require("../models/stats")

router.get("/", (req, res) => {
  res.render("index")
})

router.post("/save-data", (req, res) => {
  try {
    // can't take typing stats from js file (http request from client side)
    let newStat = new Stat({
      raw: raw,
      word_count: wpm,
      correct: 100,
      incorrect: cpm,
      user_id: req.cookies.id,
      time: timeLimit,
      accuracy: acc,
      consistency: cons,
    })
    newStat.save()
    res.render("index")
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to save stat" })
  }
})
module.exports = router
