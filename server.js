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

//get routes
const indexRouter = require("./routes/indexRoute")
const loginRouter = require("./routes/loginRoute")
const leadBoardRouter = require("./routes/leadBoardRoute")
const adminPanelRouter = require("./routes/adminPanelRouter")
const profileRouter = require("./routes/profileRouter")
const requestRouter = require("./routes/requestRoute")
const friendRouter = require("./routes/friendRoute")
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
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
app.use(session({ secret: "cat", resave: true, saveUninitialized: true }))

//connecting to routes
app.use("/", indexRouter)
app.use(loginRouter)
app.use("/leadBoard", leadBoardRouter)
app.use("/admin", adminPanelRouter)
app.use("/profile", profileRouter)
app.use("/requests", requestRouter)
app.use("/friends", friendRouter)

//app.listen
app.listen(PORT, () => {
  console.log("Server started at " + PORT)
})
