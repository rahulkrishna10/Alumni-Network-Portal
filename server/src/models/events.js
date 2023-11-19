const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema(
  {
    user: { type: String },
    response: { type: String, enum: ["yes", "no"] },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  startDate: { type: Date },
  contactEmail: { type: String },
  contactPhone: { type: String },
  registrationLink: { type: String },
  category: { type: String, enum: ["all", "students", "alumni"] },
  rsvp: [rsvpSchema],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
