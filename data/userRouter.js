const express = require("express");
const db = require("./user-model");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/users", handleAllUSersGet);
router.get("/users/:id", handleUSersGetById);
router.post("/register", handleRegister);
router.post("/login", restricted, handleLogin);

function handleLogin(req, res) {
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

function handleRegister(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
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

//custom middleware

function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    db.findBy(username)
      .then(user => {
        console.log(user);
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Unexpected error" });
      });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

module.exports = router;
