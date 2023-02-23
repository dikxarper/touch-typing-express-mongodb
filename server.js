require("dotenv").config({ path: ".env" })
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000
const User = require("./models/user")
const Stat = require("./models/stats")

//get routes
const indexRouter = require("./routes/indexRoute")
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
app.use(express.static(__dirname + "/public"))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
app.use(session({ secret: "cat", resave: true, saveUninitialized: true }))

app.get("/", (req, res) => {
  res.render("index")
})

app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user
  }
  next()
})

app.post("/save-data", (req, res) => {
  try {
    const timeR = Math.random()
    const timeLimit = timeR < 0.5 ? 30 : 60

    wpm = Math.floor(Math.random() * 11)
    wpm = wpm + 45
    cpm = Math.floor(Math.random() * 11)
    acc = Math.floor(Math.random() * (100 - 80 + 1)) + 80
    cons = Math.floor(Math.random() * (100 - 65 + 1)) + 70
    let raw = wpm + 20
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
