// Write your "actions" router here!
const express = require("express");
const router = express.Router();

//importing middlewares
const { validateActionID, validateActionPost } = require("./actions-middlware");

//importing projects model
const Actions = require("./actions-model");

router.get("/", async (req, res, next) => {
  const allActions = await Actions.get();
  try {
    res.status(200).json(allActions);
  } catch {
    next;
  }
});

router.get("/:id", validateActionID, (req, res) => {
  res.json(req.action);
});

router.post("/", validateActionPost, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", validateActionID, validateActionPost, (req, res, next) => {
  Actions.update(req.params.id, req.actionText)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.delete("/:id", validateActionID, (req, res, next) => {
  Actions.remove(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.use(
  (
    err,
    req,
    res,
    next //eslint-disable-line
  ) => {
    res.status(err.status || 500).json({
      error: err.message,
      Message: "Something went wrong!, try again never",
    });
  }
);

module.exports = router;
