const mongoose = require('mongoose');

// Define the Schema (Structure of our Collection)
const wellnessSchema = new mongoose.Schema({
  stress: { type: Number, required: true },
  sleep: { type: Number, required: true },
  mood: { type: String, required: true },
  activity: { type: Number, required: true },
  water: { type: Number, required: true },
  studyHours: { type: Number, required: true },
  familyInteraction: { type: Number, required: true },
  screenTime: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

// This creates a collection named "wellnessentries" (Mongoose automatically lowercases and pluralizes it)
module.exports = mongoose.model('WellnessEntry', wellnessSchema);
