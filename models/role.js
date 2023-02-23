const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    unique: true,
    default: "user",
  },
})

const db = mongoose.connection.useDb("projDB")
const Role = db.model("role", roleSchema)

module.exports = Role
