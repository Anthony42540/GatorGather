const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateTok } = require("../middleware/MWauth");

router.post("/", validateTok, async (req, res) => {
    const { EventId } = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({ 
        where: { EventId: EventId, userId: UserId }, 
    });
    if (!found) {
        await Likes.create({ EventId: EventId, userId: UserId });
        res.json({liked: true});
    } 
    else {
        await Likes.destroy({
            where: { EventId: EventId, userId: UserId },
        });
        res.json({liked: false});
    }
});

module.exports = router;