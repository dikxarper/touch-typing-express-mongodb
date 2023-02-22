const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')

async function getFriendData(user) {
    const friend_users = [];

    const promises = user.friends.map((id) => {
        return User.findById({ _id: id })
            .then((friend) => {
                if (!friend) {
                    throw new Error('User not found');
            }
            friend_users.push(friend);
            console.log(friend_users);
        });
    });

    await Promise.all(promises);
    return friend_users;
}

router.get('/', (req, res) => {
    try {
        User.findById({ _id: req.cookies.id }, async (err, user) => {
            if (err) {
                console.log(err)
                res.status(500).send('Server Error')
            }
            else if (!user) {
                res.status(404).send('Unauthenticated user')
            }
            else {
                var friend_users = await getFriendData(user)
                res.render('friends', { friend_users })
            }
        })
    } 
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

module.exports = router