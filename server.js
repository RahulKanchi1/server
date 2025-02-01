const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require("mongodb");

const app = express();
const routes = require("./routes/router");

let client; // Define a global client variable

app.get("/", (req, res) => {
    res.status(200).json({ message: "Working site successfully" });
});

async function connect() {
    try {
        client = await MongoClient.connect(process.env.URL, { useUnifiedTopology: true });
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
}

// Middleware to attach DB client to req
app.use((req, res, next) => {
    req.dbClient = client;
    next();
});

// Use Routes
app.use(routes);

// Start the server after connecting to MongoDB
connect().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running successfully at http://localhost:${PORT}`);
    });
});
