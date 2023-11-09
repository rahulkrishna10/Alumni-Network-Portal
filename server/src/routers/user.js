const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

//Create User
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();

    const userData = {
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
    };

    res.status(201).send(userData);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Failed to create user", details: err.message });
  }
});

//Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    const userData = {
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
    };

    res.status(200).send(userData);
  } catch (err) {
    res.status(400).send({ error: "Login Failed", details: err.message });
  }
});

//Logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.token = "";
    await req.user.save();

    res.send({ message: "Logout successful" });
  } catch (err) {
    res.status(500).send({ error: "Logout Failed", details: err.message });
  }
});

//Get user data
router.get("/users/:id?", auth, async (req, res) => {
  try {
    const id = req.query.id;
    const user = await User.findById(id).populate("profile");
    const profile = user.profile;
    if (!user) {
      res.status(400).send({ error: "User not found" });
      return;
    }
    const filteredUser = {
      _id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    };
    res.status(200).send({ user: filteredUser, profile });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Search Users
router.get("/users/search/:search?", auth, async (req, res) => {
  try {
    const query = req.params.search;
    const users = await User.find({ name: { $regex: query, $options: "i" } });
    if (!users) {
      res.status(400).send({ error: "No users found" });
      return;
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;
