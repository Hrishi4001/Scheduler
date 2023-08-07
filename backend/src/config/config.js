const { MongoClient } = require("mongodb");

const uri =
  "mongodb://ulbafcwupmcvxxvra7eb:fojdrurxcYFQTVy2EBp@besx3p30nyocz4d3gejt-mongodb.services.clever-cloud.com:2817/besx3p30nyocz4d3gejt";
const dbName = "besx3p30nyocz4d3gejt";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB database!");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
