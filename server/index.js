const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const eventRouter = require("./routes/events");
app.use("/events", eventRouter);
const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/users");
app.use("/authentication", usersRouter);

db.sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("Server running on port 5000.");
    });
});