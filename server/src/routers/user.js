const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const Event = require("../models/events");

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

// Change Password
router.patch("/users/change-password", auth, async (req, res) => {
  try {
    const user = req.user;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).send({ error: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({ message: "Password changed successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
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

//RSVP events
router.post("/users/events/:eventId/rsvp", auth, async (req, res) => {
  const { eventId } = req.params;
  const response = req.body.response;
  const userId = req.user._id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    const existingRsvp = event.rsvp.find(
      (entry) => String(entry.user) === String(userId)
    );

    if (existingRsvp) {
      existingRsvp.response = response;
    } else {
      event.rsvp.push({ user: userId, response });
    }
    await event.save();

    res.status(200).send({ response });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
