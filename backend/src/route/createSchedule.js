const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../config/config"); // Import the connectToDatabase function

async function validateAndSaveToDatabase(data) {
  if (
    !data.from_time ||
    !data.to_time ||
    !data.activityName ||
    !data.activityDescription
  ) {
    throw new Error("Invalid JSON data. All fields are required.");
  }

  try {
    const db = await connectToDatabase(); // Get the 'db' object from the connection
    const scheduleCollection = db.collection("schedule");
    const result = await scheduleCollection.insertOne(data);
    console.log("Document inserted successfully:", result.insertedId);
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    throw error;
  }
}

// POST route to handle incoming requests
router.post("/", (req, res) => {
  try {
    const requestData = req.body;
    validateAndSaveToDatabase(requestData);
    res.status(200).json({ message: "Schedule created successfully!" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
