const mongoose = require("mongoose");
const validator = require("validator");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  email: {
    type: String,
    required: true,
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
    required: function () {
      return this.user_type === "alumni";
    },
  },
  bio: {
    type: "String",
  },
  gender: {
    type: "String",
    enum: ["male", "female"],
  },
  dateOfBirth: {
    type: "String",
    required: true,
  },
  jobTitle: {
    type: "String",
  },
  companyName: {
    type: "String",
  },
  contacts: {
    linkedin: {
      type: "String",
      validator: {
        validate: (value) => {
          return validator.isURL(value);
        },
        message: "Invalid URL",
      },
    },
    phone: {
      type: "Number",
    },
    website: {
      type: "String",
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
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
