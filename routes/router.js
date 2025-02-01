const express = require("express");
const Router = express.Router();

Router.get('/ac', async (req, res) => {
    try {
        const db = req.dbClient.db('ecom'); // Replace with your actual database name
        const collection = db.collection('ac');
        const data = await collection.find().toArray();
        res.status(200).json({ "ac--data": data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
Router.get('/computer', async (req, res) => {
    try {
        const db = req.dbClient.db('ecom'); // Replace with your actual database name
        const collection = db.collection('computer');
        const data = await collection.find().toArray();
        res.status(200).json({ "computer--data": data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = Router;
