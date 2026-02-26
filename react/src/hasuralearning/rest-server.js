
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // allow requests from http://localhost:3001
app.use(express.json());

let users = [
  { id: 1, name: "AdminUser", email: "admin@gmail.com" },
  { id: 2, name: "Sathish", email: "sathish@gmail.com" }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  users = users.filter((u) => u.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(3002, () => {
  console.log("REST Server running on port 3002");
});
