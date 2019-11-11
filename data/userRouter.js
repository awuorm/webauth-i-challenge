const express = require("express");
const db = require("./user-model");
const router = express.Router();

router.get("/users", handleAllUSersGet);
router.get("/users/:id", handleUSersGetById);
router.post("/users", handleUsersPost);

function handleUsersPost(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  db.add(user)
    .then(data => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error });
    });
}

function handleUSersGetById(req, res) {
  db.findById(req.params.id)
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error });
    });
}

function handleAllUSersGet(req, res) {
  db.find()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error });
    });
}

module.exports = router;
