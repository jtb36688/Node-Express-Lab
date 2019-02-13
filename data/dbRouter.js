const express = require("express");
const db = require("./db.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  const addition = { title, contents };

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  try {
    const posts = await db.insert(addition);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const found = await db.findById(id);
    if (found) {
      res.status(200).json(found);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.remove(id);
    if (deleted) {
      db.findById(id).then(get => {
        res.status(204).json(get);
      });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/:id", async (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  const changes = { title, contents };
  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  try {
    const update = await db.update(id, changes);
    if (update) {
      db.find().then(get => {
        res.status(200).json(get);
      });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
