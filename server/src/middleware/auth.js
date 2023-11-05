const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, "anp");
    const user = await User.findOne({ email: decoded.email, token: token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};

module.exports = auth;
