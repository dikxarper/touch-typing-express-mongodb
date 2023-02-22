const mongoose = require("mongoose")

const statSchema = new mongoose.Schema({
  : {
    type: String,
    required: true,
  },
})

const db = mongoose.connection.useDb("projDB")
const Stat = db.model("stat", userSchema, "stats")

module.exports = Stat
