const express = require("express");
const router = express.Router();
const { Events} = require("../models");

router.get("/", async (req, res) => {
    const listOfEvents = await Events.findAll();
    res.json(listOfEvents);
});

// Sends data to database MySQl
router.post("/", async (req, res) => {
    const event = req.body; // Grab the event data from the body that is sent in the request
    await Events.create(event); // Inserts into our table called "Events" in MySQL
    res.json(event);
});

module.exports = router;