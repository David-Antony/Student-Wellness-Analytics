const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");
const WellnessEntry = require("./models/WellnessData");

// Helper to read data.json
function readDataFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(content || "[]");
    }
  } catch (e) {
    console.error("Error reading data.json:", e);
  }
  return [];
}

// Helper to write to data.json
function writeDataToFile(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing data.json:", e);
  }
}

// MongoDB connection
mongoose.set('bufferCommands', false);
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/StudentWellness", {
  serverSelectionTimeoutMS: 2000, 
})
  .then(() => console.log('✅ Connected to MongoDB Compass successfully!'))
  .catch((err) => console.log('⚠️ MongoDB connection failed. Falling back to local data.json file.'));

// Helper to check if MongoDB is connected
function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

// ✅ POST route to save survey data
app.post("/api/wellness", async (req, res) => {
  try {
    if (isDbConnected()) {
      const entry = new WellnessEntry(req.body);
      await entry.save();
      return res.status(201).json({ message: "Data saved successfully to MongoDB", data: entry });
    } else {
      const allData = readDataFromFile();
      const entry = {
        _id: new Date().getTime().toString(),
        stress: Number(req.body.stress),
        sleep: Number(req.body.sleep),
        mood: req.body.mood,
        activity: Number(req.body.activity),
        water: Number(req.body.water),
        studyHours: Number(req.body.studyHours),
        familyInteraction: Number(req.body.familyInteraction),
        screenTime: Number(req.body.screenTime),
        submittedAt: new Date(),
      };
      allData.push(entry);
      writeDataToFile(allData);
      return res.status(201).json({ message: "Data saved successfully to local file", data: entry });
    }
  } catch (err) {
    res.status(500).json({ message: "Error saving data", error: err.message });
  }
});

// ✅ GET route to fetch analytics
app.get("/api/analytics", async (req, res) => {
  try {
    let allData = [];
    if (isDbConnected()) {
      allData = await WellnessEntry.find();
    } else {
      allData = readDataFromFile();
    }

    const total = allData.length;

    // Handle empty data case cleanly without NaN errors in the UI
    if (total === 0) {
      return res.json({
        total: 0,
        avgStress: 0,
        avgSleep: 0,
        avgActivity: 0,
        avgStudy: 0,
        avgFamily: 0,
        avgWater: 0,
        avgScreenTime: 0,
        stressDist: {},
        sleepDist: { "0-4": 0, "5-6": 0, "7-8": 0, "9+": 0 },
        moodCount: { "Happy": 0, "Neutral": 0, "Stressed": 0, "Sad": 0 },
        scatterData: [],
      });
    }

    const avg = (field) =>
      allData.reduce((acc, cur) => acc + (cur[field] || 0), 0) / total || 0;

    // Stress distribution (0-2,3-4,5-6,7-8,9-10)
    const stressDist = {};
    allData.forEach((d) => {
      const val = d.stress || 0;
      const range = `${Math.floor(val / 2) * 2}-${Math.floor(val / 2) * 2 + 1}`;
      stressDist[range] = (stressDist[range] || 0) + 1;
    });

    // Sleep distribution (0-4,5-6,7-8,9+)
    const sleepDist = { "0-4": 0, "5-6": 0, "7-8": 0, "9+": 0 };
    allData.forEach((d) => {
      const val = d.sleep || 0;
      if (val <= 4) sleepDist["0-4"]++;
      else if (val <= 6) sleepDist["5-6"]++;
      else if (val <= 8) sleepDist["7-8"]++;
      else sleepDist["9+"]++;
    });

    // Mood distribution
    const moodCount = {};
    allData.forEach((d) => {
      const val = d.mood || "Neutral";
      moodCount[val] = (moodCount[val] || 0) + 1;
    });

    // Scatter data for correlations
    const scatterData = allData.map((d) => ({
      stress: d.stress || 0,
      sleep: d.sleep || 0,
      activity: d.activity || 0,
      study: d.studyHours || 0,
      family: d.familyInteraction || 0,
      screenTime: d.screenTime || 0,
    }));

    res.json({
      total,
      avgStress: avg("stress"),
      avgSleep: avg("sleep"),
      avgActivity: avg("activity"),
      avgStudy: avg("studyHours"),
      avgFamily: avg("familyInteraction"),
      avgWater: avg("water"),
      avgScreenTime: avg("screenTime"),
      stressDist,
      sleepDist,
      moodCount,
      scatterData,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching analytics", error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

