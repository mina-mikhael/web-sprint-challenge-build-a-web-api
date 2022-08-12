// Write your "projects" router here!
//importing express and express router
const express = require("express");
const router = express.Router();

//importing middlewares
const { validateID, validatePost } = require("./projects-middleware");

//importing projects model
const Projects = require("./projects-model");

router.get("/", (req, res) => {
  Projects.get().then((projects) => {
    res.json(projects || []);
  });
});

router.get("/:id", validateID, (req, res) => {
  res.json(req.project);
});

router.post("/", validatePost, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

module.exports = router;
