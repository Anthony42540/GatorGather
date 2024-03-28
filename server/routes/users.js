const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");

//create route for login
router.post("/login", async (request, response) => {
    const { username, password } = request.body
    const user = await users.fineOne({ where: { username: username } });

    if (!user) {
        return response.json({error: "No user matching your input."})
    }
    else{
        bcrypt.compare(password, user.password).then((found) => {
            if (!found) {
                return response.json({error: "Password is not correct."})
            }
            else{
                return response.json("Login successful.")
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
        return response.json({error: "This email is taken."})
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

// Check if username exists in database
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const userExists = await users.findOne({ where: {username: username} });
    if (userExists) {
        res.json({error: "This username is taken"});
    }
    res.json("Username is unique.");
});

module.exports = router;