require("dotenv").config({ path: ".env" })
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000

const indexRouter = require("./routes/indexRoute")
const loginRouter = require("./routes/loginRoute")

//connecting to MongoDB Database
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to database"))

//app.set
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

//middlewares
app.use(expressLayouts)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

//connecting to routes
app.use("/", indexRouter)
app.use("/account", loginRouter)

app.listen(PORT, () => {
  console.log("Server started at " + PORT)
})
