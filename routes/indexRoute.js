const express = require("express")
const router = express.Router()
const Stat = require("../models/stats")

router.get("/", (req, res) => {
    res.render("index")
  })

router.post("/save-data", (req, res) => {
  try {
    const timeR = Math.random()
    const timeLimit = timeR < 0.5 ? 30 : 60

    wpm = Math.floor(Math.random() * 11)
    wpm = wpm + 45
    cpm = Math.floor(Math.random() * 11)
    acc = Math.floor(Math.random() * (100 - 80 + 1)) + 80
    cons = Math.floor(Math.random() * (100 - 65 + 1)) + 70
    let raw = wpm + 20
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
