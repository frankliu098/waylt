require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const SongChoice = require("./models/user_schema");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect();

app.get("/", (req, res) => {
  res.json({ message: "API Working OK" });
});

app.post("/addSong", (req, res) => {
  const song = new SongChoice(req.body);
  song
    .save()
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to save song" });
    });
});

app.get("/retrieveData", (req, res) => {
  SongChoice.find()
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve data" });
    });
});

app.listen(8888, () => {
  console.log("Server started on port 8888");
});
