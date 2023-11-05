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

module.exports = router;
