const express = require("express");
const db = require("./user-model");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/users", restricted, handleAllUSersGet);
router.get("/users/:id", restricted, handleUSersGetById);
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);

function handleLogout(req, res) {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json("Error loging you out!");
      } else {
        res.json("goodbye!");
      }
    });
  } else {
    res.end();
  }
}

function handleLogin(req, res) {
  let { username, password } = req.body;
  db.findBy(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
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
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ errorMessage: "No credentials provided" });
  }
}

module.exports = router;
