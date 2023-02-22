const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
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

userSchema.plugin(passportLocalMongoose)
const userDB = mongoose.connection.useDb("projDB")
const User = userDB.model("user", userSchema)

module.exports = User
