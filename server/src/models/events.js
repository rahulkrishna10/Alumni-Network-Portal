const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  startDate: { type: Date },
  contactEmail: { type: String },
  contactPhone: { type: String },
  registrationLink: { type: String },
  category: { type: String, enum: ["all", "students", "alumni"] },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
