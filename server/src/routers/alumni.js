const express = require("express");
const Job = require("../models/jobs");
const User = require("../models/user");
const auth = require("../middleware/auth");
const Event = require("../models/events");

const router = new express.Router();

//Create Job Postings
router.post("/alumni/job", auth, async (req, res) => {
  const email = req.user.email;
  const alumni = await User.isAlumni(email);
  if (!alumni) {
    res.status(404).send({ error: "User is not an alumni" });
    return;
  }

  try {
    const job = new Job({
      ...req.body,
      posted_by: req.user_id,
    });

    job.posted_by = req.user._id;
    job.posted_by_name = req.user.name;
    await job.save();

    res.status(201).send({ job });
  } catch (err) {
    res
      .status(400)
      .send({ error: "Failed to create job posting", details: err.message });
  }
});

//Get all jobs
router.get("/alumni/job", auth, async (req, res) => {
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

//Update Job Postings
router.patch("/alumni/job/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "registration_date", "description"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      posted_by: req.user._id,
    });
    if (!job) {
      res.status(404).send({ error: "Job posting not found" });
    }
    updates.forEach((update) => {
      return (job[update] = req.body[update]);
    });
    job.save();
    res.send(job);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

//Delete Job Postings
router.delete("/alumni/job/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      posted_by: req.user.id,
    });
    if (!job) {
      res.status(404).send({ error: "Job posting not found" });
    }
    res.send(job);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Failed to delete job posting", details: err.message });
  }
});

//Get Events
router.get("/alumni/events", async (req, res) => {
  try {
    const event = await Event.find({
      $or: [{ category: "all" }, { category: "alumni" }],
    });
    if (event.length === 0) {
      res.status(404).send("No Events Found");
      return;
    }
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
