const express = require('express')
const router = express.Router()
const User = require('../models/user')

async function getRequestsData(user) {
    const req_users = [];

    const promises = user.requests.map((id) => {
        return User.findById({ _id: id })
            .then((friend) => {
                if (!friend) {
                    throw new Error('User not found');
            }
            req_users.push(friend);
            console.log(req_users);
        });
    });

    await Promise.all(promises);
    return req_users;
}

router.get('/', (req, res) => {
    console.log("current:", req.cookies.id)
    try {
        User.findById( { _id: req.cookies.id }, async (err, user) => {
            if (err) {
                console.log(err)
                res.status(500).send('Server Error')
            }
            else if (!user) {
                res.status(404).send('Unauthenticated user')
            }
            else {
                const req_users = await getRequestsData(user)

                console.log(req_users)
                res.render('request_list', { req_users })
            }
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.post('/accept', async (req, res) => {
    var accepted_friend_id = req.body.friendID
    try {
        const user = await User.findById({ _id: req.cookies.id })
        if (!user) {
            return res.status(404).send('Unauthorized user')
        }
        user.friends.push(accepted_friend_id)
        await user.save()

        const index = user.requests.indexOf(accepted_friend_id)
        if (index !== -1) {
            user.requests.splice(index, 1)
        }
        await user.save()

        res.redirect('/requests')
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.post('/reject', async (req, res) => {
    var rejected_friend_id = req.body.friendID
    try {
        const user = await User.findById({ _id: req.cookies.id })
        if (!user) {
            return res.status(404).send('Unauthorized user')
        }

        const index = user.requests.indexOf(rejected_friend_id)
        if (index !== -1) {
            user.requests.splice(index, 1)
        }
        await user.save()

        res.redirect('/requests')
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

function levenshteinDistance(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    const distances = [];
    for (let i = 0; i <= b.length; i++) {
      distances[i] = [i];
      for (let j = 1; j <= a.length; j++) {
        if (i === 0) {
          distances[i][j] = j;
        } else {
          distances[i][j] = 0;
        }
      }
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const substitutionCost = (a[j - 1] === b[i - 1]) ? 0 : 1;
        distances[i][j] = Math.min(
          distances[i][j - 1] + 1,
          distances[i - 1][j] + 1,
          distances[i - 1][j - 1] + substitutionCost
        );
      }
    }

    return 1 - (distances[b.length][a.length] / Math.max(a.length, b.length));
}

router.post('/search', (req, res) => {
    var search_name = req.body.searching
    try {
        User.find({ }, (error, user) => {
            if (error) {
                console.log(error)
                res.status(500).send('Server Error')
            }
            var closest_approximation = 0
            var index_of_word
            for (let i = 0; i < user.length; i++) {
                similarity = levenshteinDistance(search_name, user[i].username)
                if (similarity > closest_approximation) {
                    closest_approximation = similarity
                    index_of_word = i
                }
            }
            if (closest_approximation < 0.5) {
                res.redirect('/requests')
            }
            else {
                res.redirect(`/profile/${user[index_of_word]._id}`)
            }
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

module.exports = router