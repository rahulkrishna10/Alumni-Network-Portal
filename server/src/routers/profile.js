const express = require("express");
const Profile = require("../models/profile");
const auth = require("../middleware/auth");

const router = new express.Router();

//Create Profile
router.post("/users/profile", auth, async (req, res) => {
  try {
    const profile = new Profile({
      ...req.body,
      user: req.user._id,
      email: req.user.email,
    });
    await profile.save();
    res.status(201).send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

//Get Profile of Other Users
router.get("/users/profile/:id", auth, async (req, res) => {
  try {
    id = req.params.id;
    const profile = await Profile.findOne({ user: id });
    if (!profile) {
      res.status(404).send({ error: "Profile not found" });
      return;
    }
    res.send(profile);
  } catch (e) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Get Profile
router.get("/users/profile", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.user.email });
    if (!profile) {
      res.status(404).send({ error: "Profile not found" });
      return;
    }
    res.send(profile);
  } catch (e) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Update Profile
router.patch("/users/profile", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "bio",
    "jobTitle",
    "companyName",
    "skills",
    "contacts",
    "skills",
    "gender",
  ];

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
    return;
  }

  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      res.status(404).send({ error: "Profile not found" });
      return;
    }

    updates.forEach((update) => {
      return (profile[update] = req.body[update]);
    });

    profile.save();
    res.send(profile);
  } catch (e) {
    res.status(500).send({ error: "Server Error" });
    return;
  }
});

module.exports = router;
