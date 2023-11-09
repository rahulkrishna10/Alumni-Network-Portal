const express = require("express");
const Admin = require("../models/admin");
const Event = require("../models/events");

const router = new express.Router();

//Create Admin
router.post("/admin", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    console.log(req.body);
    await admin.save();

    const adminData = {
      id: admin._id,
      email: admin.email,
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
      req.body.email,
      req.body.password
    );

    res.status(200).send(admin);
  } catch (err) {
    res.status(400).send({ error: "Login Failed", details: err.message });
  }
});

//Add Events
router.post("/admin/events", async (req, res) => {
  try {
    const events = new Event(req.body);
    console.log(req.body);
    await events.save();
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to create event", detials: err.message });
  }
});

module.exports = router;
