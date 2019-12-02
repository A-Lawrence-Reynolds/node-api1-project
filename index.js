// implement your API here
const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());
// GET request
server.get("/", (req, res) => {
  res.send({ api: "up and running " });
});
// GET all
server.get("/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log("error on GET /users", error);
      res
        .status(500)
        .json({ errorMessage: "error getting list of users from database" });
    });
});
// GET by id
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log("error on GET /users", error);
      res
        .status(500)
        .json({ errorMessage: "error getting list of users from database" });
    });
});

// POST request
server.post("/users", (req, res) => {
  const userData = req.body;

  db.insert(userData)
    .then(user => {
      res.status(201).json(user);
    })

    .catch(error => {
      console.log("error on POST /users", error);
      res.status(500).json({ errorMessage: "error adding user" });
    });
});

// DELETE request
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: "User removed successfully", removed });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      console.log("error on DELETE /users", error);
      res.status(500).json({ errorMessage: "error deleting user" });
    });
});

// PUT request

server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  db.update(id, data)
    .then(updatedUser => {
      res.status(201).json(updatedUser);
    })
    .catch(error => {
      console.log("error on PUT /users/:id", error);
      res.status(500).json({ errorMessage: "error updating user " });
    });
});

// API running here
const port = 5000;
server.listen(port, () => console.log(`\n API working on port ${port}\n`));
