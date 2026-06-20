const mongoose = require("mongoose");
const WellnessEntry = require("./models/WellnessData");

// MongoDB connection string for local development
mongoose.connect("mongodb://127.0.0.1:27017/StudentWellness");


const moods = ["Happy", "Neutral", "Stressed", "Sad"];

async function seedData() {
    const records = [];

    for (let i = 0; i < 500; i++) {

        const stress = Math.floor(Math.random() * 10) + 1;
        const sleep = Math.floor(Math.random() * 8) + 3;
        const activity = Math.floor(Math.random() * 6);
        const water = Math.floor(Math.random() * 5) + 1;
        const studyHours = Math.floor(Math.random() * 10);
        const familyInteraction = Math.floor(Math.random() * 6);
        const screenTime = Math.floor(Math.random() * 10);

        let mood;

        if (stress <= 3 && sleep >= 7) {
            mood = "Happy";
        } else if (stress >= 8) {
            mood = "Stressed";
        } else if (sleep <= 4) {
            mood = "Sad";
        } else {
            mood = "Neutral";
        }

        records.push({
            stress,
            sleep,
            mood,
            activity,
            water,
            studyHours,
            familyInteraction,
            screenTime,
            submittedAt: new Date(
                Date.now() - Math.floor(Math.random() * 90) * 86400000
            )
        });
    }

    await WellnessEntry.insertMany(records);

    console.log("500 records inserted successfully!");

    mongoose.connection.close();
}

seedData();