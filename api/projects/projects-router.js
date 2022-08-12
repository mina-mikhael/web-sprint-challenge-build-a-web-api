// Write your "projects" router here!
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: " hello from the projects router" });
});

module.exports = router;
