const express = require("express");
const router = express.Router();
const { Events } = require("../models");
const { validateTok } = require("../middleware/MWauth");

// retrieves data from database
router.get("/", async (req, res) => {
    let listOfEvents = await Events.findAll();
    listOfEvents.forEach((event,index) => listOfEvents[index].categoryTag = listOfEvents[index].categoryTag?.split(','));
    res.json(listOfEvents);
});

// retrieves individual event information by ID
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    let event = await Events.findByPk(id);
    event.categoryTag = event.categoryTag?.split(',');
    res.json(event);
})

// Sends data to database MySQl
router.post("/", async (req, res) => {
    const event = req.body; // Grab the event data from the body that is sent in the request
    req.body.categoryTag = req.body.categoryTag.join(',');
    await Events.create(event); // Inserts into our table called "Events" in MySQL
    res.json(event);
});

module.exports = router;