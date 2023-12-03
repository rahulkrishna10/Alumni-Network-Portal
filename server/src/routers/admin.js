const express = require("express");
const Admin = require("../models/admin");
const Event = require("../models/events");
const User = require("../models/user");
const Job = require("../models/jobs");

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

//Alumni Directory
router.get("/admin/directory", async (req, res) => {
  try {
    const users = await User.find({
      user_type: "alumni",
    })
      .sort({ name: 1 })
      .populate("profile");

    const flattenedData = users.map((user) => {
      const userProfile = user.profile && user.profile[0];
      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        isProfile: !!userProfile,
        email: userProfile ? userProfile.email : null,
        passingOutYear: userProfile ? userProfile.passingOutYear : null,
        gender: userProfile ? userProfile.gender : null,
        dateOfBirth: userProfile ? userProfile.dateOfBirth : null,
        jobTitle: userProfile ? userProfile.jobTitle : null,
        companyName: userProfile ? userProfile.companyName : null,
      };
    });

    res.status(200).send(flattenedData);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Get User Count
router.get("/admin/users/count", async (req, res) => {
  try {
    const alumniCount = await User.countDocuments({ user_type: "alumni" });
    const studentsCount = await User.countDocuments({ user_type: "student" });

    if (alumniCount === 0 && studentsCount === 0) {
      res.status(400).send("No users found");
      return;
    }

    res.status(200).send({ alumniCount, studentsCount });
  } catch (err) {
    res.status(500).send({ error: "Server Error", details: err.message });
  }
});

router.get("/admin/users/created_dates", async (req, res) => {
  try {
    const users = await User.find({}, "_id name createdAt"); // Fetching only necessary fields
    const userData = users.map((user) => ({
      userId: user._id,
      name: user.name,
      createdDate: user.createdAt,
    }));

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get all Users
router.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Delete Users
router.delete("/admin/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Create Events
router.post("/admin/event", async (req, res) => {
  try {
    const events = new Event(req.body);
    await events.save();
    res.status(201).send(events);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Failed to create event", detials: err.message });
  }
});

//Get event count
router.get("/admin/event/count", async (req, res) => {
  try {
    const eventCount = (await Event.find()).length.toString();
    if (!eventCount) {
      res.status(400).send("No events found");
    }

    res.status(200).send(eventCount);
  } catch (err) {
    res.status(500).send({ error: "Server Error", details: err.message });
  }
});

//Get Events
router.get("/admin/events", async (req, res) => {
  try {
    const event = await Event.find();
    if (!event) {
      res.status(404).send("No Events Found");
      return;
    }
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
});

//Update Events
router.patch("/admin/event/:id", async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(400).send({ error: "Event not found" });
      return;
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

//Delete Events
router.delete("/admin/event/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findByIdAndRemove(id);
    if (!event) {
      res.status(404).send({ error: "Event was not found" });
      return;
    }
    res.status(200).send(event);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Failed to delete event", details: err.message });
  }
});

//Get job count
router.get("/admin/job/count", async (req, res) => {
  try {
    const jobCount = (await Job.find()).length.toString();
    if (!jobCount) {
      res.status(400).send("No events found");
    }

    res.status(200).send(jobCount);
  } catch (err) {
    res.status(500).send({ error: "Server Error", details: err.message });
  }
});

module.exports = router;
