const express = require("express");
const Admin = require("../models/admin");
const Event = require("../models/events");
const User = require("../models/user");

const router = new express.Router();

//Create Admin
router.post("/admin", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();

    const adminData = {
      id: admin._id,
      username: admin.username,
    };

    res.status(201).send(adminData);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Failed to create user", details: err.message });
  }
});

//Admin Login
router.post("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.username,
      req.body.password
    );

    res.status(200).send(admin);
  } catch (err) {
    res.status(400).send({ error: "Login Failed", details: err.message });
  }
});

//Create Events
router.post("/admin/event", async (req, res) => {
  try {
    const events = new Event(req.body);
    await events.save();
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to create event", detials: err.message });
  }
});

//Update Events
router.patch("/admin/event", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "location",
    "contactusername",
    "contactPhone",
    "registrationLink",
  ];

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const event = await Event.findOne({ id: req.body.id });

    if (!event) {
      res.status(400).send({ error: "Event not found" });
    }

    updates.forEach((update) => {
      return (event[update] = req.body[update]);
    });

    event.save();
    res.send(event);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Alumni Directory
router.get("/admin/directory", async (req, res) => {
  try {
    const users = await User.find({
      user_type: "alumni",
    }).populate("profile");

    const usersData = users.map((user) => ({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
      },
      profile: user.profile,
    }));

    res.status(200).send(usersData);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Delete Users
router.delete("/admin/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(400).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;
