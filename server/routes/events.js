const express = require("express");
const router = express.Router();
const { Events } = require("../models");

// retrieves data from database
router.get("/", async (req, res) => {
    const listOfEvents = await Events.findAll();
    res.json(listOfEvents);
});

// retrieves individual event information by ID
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const event = await Events.findByPk(id);
    res.json(event);
})

// Sends data to database MySQl
router.post("/", async (req, res) => {
    const event = req.body; // Grab the event data from the body that is sent in the request
    await Events.create(event); // Inserts into our table called "Events" in MySQL
    res.json(event);
});

module.exports = router;