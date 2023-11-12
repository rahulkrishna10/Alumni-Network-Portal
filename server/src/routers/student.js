const express = require("express");
const Event = require("../models/events");
const Job = require("../models/jobs");
const auth = require("../middleware/auth");

const router = new express.Router();

//Get job details
router.get("/student/job", auth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ created_date: -1 });
    if (!jobs) {
      res.status(400).send({ error: "Jobs not found" });
    }
    res.status(200).send(jobs);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Get Events for Students
router.get("/student/events", auth, async (req, res) => {
  try {
    const event = await Event.find({
      $or: [{ category: "all" }, { category: "student" }],
    });
    if (event.length === 0) {
      res.status(404).send("No Events Found");
      return;
    }
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Get event details
router.get("/student/events/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).send("Event Not Found");
      return;
    }
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;
