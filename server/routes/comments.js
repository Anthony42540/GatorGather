const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateTok } = require("../middleware/MWauth");

// retrieves all comments for a specific event
router.get('/:eventid', async (req, res) => {
    const eventid = req.params.eventid;
    const comments = await Comments.findAll({ where: {EventId: eventid} });
    res.json(comments);
});

// posts a comment to an event
router.post("/", validateTok, async (req, res) => {
    const comment = req.body
    await Comments.create(comment)
    res.json(comment)
})

module.exports = router;