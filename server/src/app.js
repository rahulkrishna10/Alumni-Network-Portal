const express = require("express");
const cors = require("cors");
require("./db/mongodb");

const userRouter = require("./routers/user");
const profileRouter = require("./routers/profile");
const alumniRouter = require("./routers/alumni");
const adminRouter = require("./routers/admin");
const studentRouter = require("./routers/student");

const app = express();

app.use(cors());

const port = 3001;
app.use(express.json());

app.use(profileRouter);
app.use(userRouter);
app.use(alumniRouter);
app.use(adminRouter);
app.use(studentRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
