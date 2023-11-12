const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Login
adminSchema.statics.findByCredentials = async (username, password) => {
  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  return admin;
};

//Hash Password
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
