const mongoose = require("mongoose")

const statSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  text_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "text",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  raw: {
    type: Number,
    required: true,
  },
  wpm: {
    type: Number,
  },
  time: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  consistency: {
    type: Number,
  },
  correct: {
    type: Number,
    required: true,
  },
  incorrect: {
    type: Number,
    required: true,
  },
})

const db = mongoose.connection.useDb("projDB")
const Stat = db.model("stat", statSchema)

module.exports = Stat
