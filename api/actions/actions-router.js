// Write your "actions" router here!
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: " hello from the actions router" });
});

module.exports = router;
