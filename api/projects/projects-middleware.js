// add middlewares here related to projects
//importing model
const Projects = require("./projects-model");

function logger(req, res, next) {
  console.log(
    `Request method: ${req.method}`,
    `Request url: ${req.originalUrl}`,
    `Timestamp: ${new Date().toISOString()}`
  );
  next();
}

const validateProjectId = (req, res, next) => {
  if (!req.params.id) {
    res.status(404).json({
      message: `project id is required`,
    });
    return;
  } else {
    Projects.get(req.params.id)
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

const validateProjectPost = (req, res, next) => {
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
  validateProjectId,
  validateProjectPost,
  logger,
};
