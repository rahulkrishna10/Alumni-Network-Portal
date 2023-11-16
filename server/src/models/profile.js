const mongoose = require("mongoose");
const validator = require("validator");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: "Invalid Email Address",
    },
  },
  passingOutYear: {
    type: Number,
  },
  bio: {
    type: "String",
    default: null,
  },
  gender: {
    type: "String",
    enum: ["male", "female"],
    default: null,
  },
  dateOfBirth: {
    type: "Date",
    default: null,
  },
  jobTitle: {
    type: "String",
    default: null,
  },
  companyName: {
    type: "String",
    default: null,
  },
  contacts: {
    linkedin: {
      type: "String",
      default: null,
      validator: {
        validate: (value) => {
          return validator.isURL(value);
        },
        message: "Invalid URL",
      },
    },
    phone: {
      type: "Number",
      default: null,
    },
    website: {
      type: "String",
      default: null,
      validator: {
        validate: (value) => {
          return validator.isURL(value);
        },
        message: "Invalid URL",
      },
    },
  },
  skills: [
    {
      type: String,
      default: null,
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
