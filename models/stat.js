const mongoose = require("mongoose")

const statSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  text_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "text",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  raw: {
    type: Number,
    required: true,
  },
  word_count: {
    type: Number,
    required: true,
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
    required: true,
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

const DB = mongoose.connection.useDb("projDB")
const Stat = DB.model("stat", statSchema, "stat")

module.exports = Stat