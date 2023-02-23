const express = require("express")
const router = express.Router()
const Stat = require("../models/stats")

router.get("/", (req, res) => {
  res.render("index")
})

router.post("/", (req, res) => {
  const timeTag = document.querySelector(".time span b"),
    wordTag = document.querySelector(".word span"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span")

  let cpm = cpmTag.innerText
  let wpm = wpmTag.innerText
  let raw = wpm + 20
  let newStat = new Stat({
    raw: raw,
    wpm: wpm,
    correct: 100,
    incorrect: cpm,
  })

  newStat.save()
})
module.exports = router
