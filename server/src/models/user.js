const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Profile = require("./profile");

//User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    user_type: {
      type: String,
      required: true,
      enum: ["student", "alumni"],
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("job_postings", {
  ref: "Jobs",
  localField: "_id",
  foreignField: "posted_by",
});

//Find user with the login credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  return user;
};

//Find user of type alumni
userSchema.statics.isAlumni = async (email) => {
  const user = await User.findOne({ email });

  if (user.user_type === "alumni") {
    return true;
  }

  return false;
};

//Generate JWT Tokens
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ email: user.email }, "anp");

  user.token = token;
  await user.save();

  return token;
};

//Hash the plain text password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  console.log("working");
  const user = this;
  await Profile.findOneAndRemove({ user: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
