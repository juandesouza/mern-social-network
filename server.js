const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//DB Config
const db = require("./config/keys");

//Connect to MongoDB
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", err => {
  console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => res.send("Hello"));

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
