const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    unique: true,
    default: "user",
  },
})

const userDB = mongoose.connection.useDb("userDB")
const Role = userDB.model("role", roleSchema)

module.exports = Role
