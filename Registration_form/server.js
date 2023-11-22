const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const User = require("./model/db");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/signup.html"));
});
app.get("/home", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/home.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/signup.html"));
});

app.post("/signup", async (req, res) => {
  const email = await User.find({ email: req.body.email });
  if (email.length == 0) {
    await User.create(req.body);
    res.json("Email Register Sucessfully");
    //res.sendFile(path.join(__dirname, "./public/home.html"));
  } else {
    //res.sendFile(path.join(__dirname, "./public/signup.html"));
    res.json("Email already Exixts");
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server Started at 3000 ❤️ ❤️ ❤️");
});
