const express = require("express")
const router = express.Router()
const Stat = require("../models/stats")

router.get("/", (req, res) => {
    res.render("index")
  })

router.post("/save-data", (req, res) => {
  try {
    wpm = Math.floor(Math.random() * 11)
    cpm = Math.floor(Math.random() * 11)
    let raw = wpm + 20
    let newStat = new Stat({
      raw: raw,
      wpm: wpm,
      correct: 100,
      incorrect: cpm,
    })
    newStat.save()
    // Save the wpm and cpm values to your database
    // ...
    res.status(200).json({ message: "Stat saved successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to save stat" })
  }
})
module.exports = router
