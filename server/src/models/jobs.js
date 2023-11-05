const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  posted_date: {
    type: Date,
    default: Date.now(),
  },
  registration_date: {
    type: "String",
    required: true,
  },
  title: {
    type: "String",
    required: true,
  },
  type: {
    type: "String",
    required: true,
    enum: ["Full-time", "Internship"],
  },
  description: {
    type: "String",
    required: true,
  },
  company: {
    type: "String",
    required: true,
  },
  required_skills: [
    {
      type: "String",
    },
  ],
  contact: {
    email: {
      type: "String",
      validator: {
        validate: (value) => {
          return validator.isEmail(value);
        },
      },
      message: "Invalid email",
    },
    link: {
      type: "String",
      validator: {
        validate: (value) => {
          return validator.isURL(value);
        },
      },
      message: "Invalid URL",
    },
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
