const express = require("express");
const app = express();
const path = require("path");

const { connectDB, closeDB } = require("./config/db");

//Connect Database
connectDB("Main Thread");

const User = require("./models/User");

//Init middleware
app.use(express.json({ extended: false })); //can now accept req.body data

//Define routes
app.use("/notes", require("./routes/notes"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));

//Serve static assets (react) in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  //route that is not one of the ones already defined above
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000; //looks for process.env in production
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
