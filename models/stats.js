const { ObjectID } = require("bson")
const mongoose = require("mongoose")

const statSchema = new mongoose.Schema({
  user_id: {
    type: ObjectID,
  },
  text_id: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  wpm: {
    type: Number,
    required: true,
  },
  raw: {
    type: Number,
    required: true,
  },
  word_count: {
    type: Number,
  },
  time: {
    type: Number,
  },
  accuracy: {
    type: Number,
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

const userDB = mongoose.connection.useDb("projDB")
const Stat = userDB.model("stat", statSchema)

module.exports = Stat
