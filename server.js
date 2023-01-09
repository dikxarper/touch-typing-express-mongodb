require("dotenv").config({ path: ".env" })
const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()

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
app.use(express.json)

//connecting to routes
app.use("/", indexRouter)

app.listen(PORT, () => {
  console.log("Server started at " + PORT)
})
