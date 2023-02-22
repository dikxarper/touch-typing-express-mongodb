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
  friends: {
    type: [mongoose.Types.ObjectId],
    default: []
  },
  requests: {
    type: [mongoose.Types.ObjectId],
    default: []
  }
})

const userDB = mongoose.connection.useDb("projDB")
const User = userDB.model("user", userSchema)

module.exports = User
