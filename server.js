require("dotenv").config({ path: ".env" })
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000

const indexRouter = require("./routes/index")

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to database"))

//app.set
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

//middlewares
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
app.use(express.static("public"))

//connecting to routes
app.use("/", indexRouter)

app.listen(PORT, () => {
  console.log("Server started at " + PORT)
})
