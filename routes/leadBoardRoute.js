const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Stat = require("../models/stats")

router.get("/", (req, res) => {
  Stat.aggregate(
    [
      { $match: { time: 60 } },
      // Group by user_id and find the max wpm for each group
      { $group: { _id: "$user_id", maxWpm: { $max: "$wpm" } } },
      // Join with the User collection to get the username and email for each user
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      // Flatten the user array
      { $unwind: "$user" },
      // Project only the necessary fields
      {
        $project: {
          _id: 0,
          username: "$user.username",
          country: "$user.country",
          organization: "$user.organization",
          maxWpm: 1,
        },
      },
    ],
    (err, stat) => {
      console.log(stat)
      res.render("leadBoard", { user60: stat, user30: stat })
    }
  )
})

module.exports = router
