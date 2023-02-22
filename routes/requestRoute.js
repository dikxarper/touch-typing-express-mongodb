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
            req_users.push({ _id: friend._id, username: friend.username, country: friend.country });
            console.log(req_users);
        });
    });

    await Promise.all(promises);
    return req_users;
}

router.get('/', async (req, res) => {
    try {
        User.findById( { _id: req.params.id }, async (err, user) => {
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

module.exports = router