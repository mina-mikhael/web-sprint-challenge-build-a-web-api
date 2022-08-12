const express = require("express");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();
const { logger } = require("./projects/projects-middleware");

server.use(express.json());
server.use("/", logger);

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use("*", (req, res) => {
  res.status(500).json({ message: "invalid endpoint, try again never" });
});

module.exports = server;
