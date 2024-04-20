const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateTok } = require("../middleware/MWauth")

//create route for login
router.post("/login", async (request, response) => {
    const { username, password } = request.body
    const user = await users.findOne({ where: { username: username } });

    if (!user) {
        return response.json({error: "User does not exists."})
    }
    else{
        bcrypt.compare(password, user.password).then((found) => {
            if (!found) {
                return response.json({error: "Password is not correct."})
            }
            else{
                const token = sign(
                    {username: user.username, id: user.id}, 
                    "secret"
                );
                response.json({token: token, username: username, id: user.id});
            }
        });
    }
});

// Sends username, email, and password to database for registration
router.post("/", async (request, response) => {
    const { username, email, password } = request.body;
    const user = await users.findOne({ where: { username: username } });
    const emailaddress = await users.findOne({ where: { email: email } });

    //check that username doesnt already exist
    if (user) {
        return response.json({error: "This username is taken."})
    }
    else if (emailaddress) {
        return response.json({error: "This email is already associated with an account."})
    }
    else{
        bcrypt.hash(password, 15).then((hash) => {
            users.create({
                username: username,
                email: email,
                password: hash,
            })
            return response.json("Account successfully created.")
        });
    }
});

// Verifies token so user cant create fake on in local storage
router.get('/verify', validateTok, async (request, response) => {
    response.json(request.user)
})

module.exports = router;