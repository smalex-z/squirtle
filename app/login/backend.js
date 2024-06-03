const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON

const CONNECTION_STRING = process.env.CONNECTION_STRING || "mongodb+srv://user1:1234abcd@cluster0.qb5nolq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "accountdb";
let database;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    database = client.db(DATABASENAME);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

app.listen(3000, () => {
  connectToDatabase();
  console.log("Server is running on port 3000");
});

app.post('/signup', async (req, res) => {
    console.log("Signup Request Body:", req.body);
  try {
    const { name, username, password } = req.body;
    console.log("Signup Request Body:", req.body); // Log the request body
    const collection = database.collection("users"); // Ensure the collection name is correct
    await collection.insertOne({ name, username, password });
    res.status(200).send({ message: 'User signed up successfully' });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login Request Body:", req.body); // Log the request body
    const collection = database.collection("users"); // Ensure the collection name is correct
    const user = await collection.findOne({ username, password });
    if (user) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
