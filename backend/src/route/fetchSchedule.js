const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../config/config"); // Import the connectToDatabase function

// Function to retrieve all data from the "schedule" collection
async function getAllScheduleData() {
  try {
    const db = await connectToDatabase();
    const scheduleCollection = db.collection("schedule");
    const data = await scheduleCollection.find({}).toArray();
    return data;
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    throw error;
  }
}

// POST route to handle incoming requests (Create a new schedule entry)
router.post("/", async (req, res) => {
  try {
    const requestData = req.body;
    await validateAndSaveToDatabase(requestData);
    res.status(200).json({ message: "Schedule created successfully!" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).json({ error: error.message });
  }
});

// GET route to retrieve all data from the "schedule" collection
router.get("/", async (req, res) => {
  try {
    const data = await getAllScheduleData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving schedule data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
