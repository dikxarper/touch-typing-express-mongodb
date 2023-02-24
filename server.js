require("dotenv").config({ path: ".env" })
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000
const Stat = require("./models/stats")

//get routes
const indexRouter = require("./routes/indexRoute")
const headerRouter = require("./routes/headerRouter")
const loginRouter = require("./routes/loginRoute")
const leadBoardRouter = require("./routes/leadBoardRoute")
const adminPanelRouter = require("./routes/adminPanelRouter")
const profileRouter = require("./routes/profileRouter")
const requestRouter = require("./routes/requestRoute")
const friendRouter = require("./routes/friendRoute")
const aboutRouter = require("./routes/aboutRouter")
const cookieParser = require("cookie-parser")

//connecting to MongoDB Database
mongoose.set("strictQuery", false)
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
app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
)
app.use(express.static(__dirname + "/public"))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/save-data", (req, res) => {
  try {
    let newStat = new Stat({
      raw: raw,
      wpm: wpm,
      correct: 100,
      incorrect: cpm,
      user_id: req.cookies.id,
      time: timeLimit,
      accuracy: acc,
      consistency: cons,
    })
    newStat.save()
    res.render("index")
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to save stat" })
  }
})

//connecting to routes
app.use(loginRouter)
app.use(headerRouter)
app.use("/leadBoard", leadBoardRouter)
app.use("/admin", adminPanelRouter)
app.use("/profile", profileRouter)
app.use("/requests", requestRouter)
app.use("/friends", friendRouter)
app.use("/about", aboutRouter)

//app.listen
app.listen(PORT, () => {
  console.log("Server started at " + PORT)
})
