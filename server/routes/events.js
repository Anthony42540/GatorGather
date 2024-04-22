const express = require("express");
const router = express.Router();
const { Events, Likes } = require("../models");
const { validateTok } = require("../middleware/MWauth");

// retrieves data from database
router.get("/", validateTok, async (req, res) => {
    let listOfEvents = await Events.findAll({include: [Likes]});
    listOfEvents.forEach((event,index) => listOfEvents[index].categoryTag = listOfEvents[index].categoryTag?.split(','));
    const likedEvents = await Likes.findAll({ where: {userId: req.user.id }})
    res.json({ listOfEvents: listOfEvents, likedEvents: likedEvents });
});

// retrieves individual event information by ID
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    let event = await Events.findByPk(id);
    event.categoryTag = event.categoryTag?.split(',');
    res.json(event);
})

// Sends data to database MySQl
router.post("/", validateTok, async (req, res) => {
    const event = req.body; // Grab the event data from the body that is sent in the request
    if (req.body.categoryTag) {
        req.body.categoryTag = req.body.categoryTag.map(option => option.value).join(',');
    } else {
        req.body.categoryTag = null;
    }
    req.body.username = req.user.username;
    await Events.create(event); // Inserts into our table called "Events" in MySQL
    res.json(event);
});

router.delete("/:eventId", validateTok, async (req, res) => {
    const eventId = req.params.eventId;

    await Events.destroy({
        where: {
            id: eventId,
        },
    });

    res.json("DELETED SUCCESSFULLY")
})

module.exports = router;