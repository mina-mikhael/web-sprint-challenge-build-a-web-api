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
      .then((project) => {
        if (!project) {
          res.status(404).json({
            message: `project with id ${req.params.id} doesn't exist`,
          });
        } else {
          req.project = project;
          next();
        }
      })
      .catch(() => {
        res.status(500).json({ message: "server messed up" });
      });
  }
};

const validateActionPost = (req, res, next) => {
  const { name, description, completed } = req.body;
  if (
    !name ||
    !description ||
    !name.trim() ||
    !description.trim() ||
    completed == null
  ) {
    res.status(400).json({ message: "name and description are required" });
  } else {
    req.projectText = {
      name: name.trim(),
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
