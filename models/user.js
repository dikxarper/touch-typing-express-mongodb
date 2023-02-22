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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    ref: "Role",
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
  },
})

const userDB = mongoose.connection.useDb("userDB")
const User = userDB.model("user", userSchema)

module.exports = User
