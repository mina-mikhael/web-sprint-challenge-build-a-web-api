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
  Projects.insert(req.projectText)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put("/:id", validateID, validatePost, (req, res, next) => {
  Projects.update(req.params.id, req.projectText)
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.delete("/:id", validateID, (req, res, next) => {
  Projects.remove(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get("/:id/actions", validateID, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((projectActions) => {
      res.json(projectActions);
    })
    .catch(next);
});

module.exports = router;
