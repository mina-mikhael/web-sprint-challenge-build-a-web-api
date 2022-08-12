// add middlewares here related to actions
//importing model
const Actions = require("./actions-model");

const validateActionID = (req, res, next) => {
  if (!req.params.id) {
    res.status(404).json({
      message: `project id is required`,
    });
    return;
  } else {
    Actions.get(req.params.id)
      .then((action) => {
        if (!action) {
          res.status(404).json({
            message: `action with id ${req.params.id} doesn't exist`,
          });
        } else {
          req.action = action;
          next();
        }
      })
      .catch(() => {
        res.status(500).json({ message: "server messed up" });
      });
  }
};

const validateActionPost = (req, res, next) => {
  const { notes, description, completed, project_id } = req.body;
  if (
    !notes ||
    !description ||
    !notes.trim() ||
    !description.trim() ||
    completed == null ||
    !project_id
  ) {
    res.status(400).json({ message: "project_id, notes and description are required" });
  } else if (typeof project_id !== "number") {
    res.status(400).json({ message: "project_id must be a number" });
  } else {
    req.actionText = {
      project_id: project_id,
      notes: notes.trim(),
      description: description.trim(),
      completed: completed,
    };

    next();
  }
};

module.exports = {
  validateActionID,
  validateActionPost,
};
