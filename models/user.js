const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  country: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  avg_wpm: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model("User", userSchema)
