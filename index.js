const express = require('express');
const db = require("./config");
const app = express();
const cors = require("cors");
app.use(cors());

// 一次性讀取 ClassA 集合
app.get("/ts/classA", async (req, res) => {
    try {
        const snapshot = await db.collection("ClassA").get();

        if (snapshot.empty) {
            res.status(404).json({ error: "No documents found in ClassA collection" });
            return;
        }

        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });

        res.json(data);
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 一次性讀取 location 集合
app.get("/ts/location", async (req, res) => {
    try {
        const snapshot = await db.collection("location").get();

        if (snapshot.empty) {
            res.status(404).json({ error: "No documents found in location collection" });
            return;
        }

        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });

        res.json(data);
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 一次性讀取 order 集合
app.get("/ts/order", async (req, res) => {
    try {
        const snapshot = await db.collection("order").get();

        if (snapshot.empty) {
            res.status(404).json({ error: "No documents found in order collection" });
            return;
        }

        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });

        res.json(data);
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 一次性讀取 store 集合
app.get("/ts/store", async (req, res) => {
    try {
        const snapshot = await db.collection("store").get();

        if (snapshot.empty) {
            res.status(404).json({ error: "No documents found in store collection" });
            return;
        }

        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });

        res.json(data);
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 一次性讀取 status 集合
app.get("/ts/status", async (req, res) => {
    try {
        const snapshot = await db.collection("status").get();

        if (snapshot.empty) {
            res.status(404).json({ error: "No documents found in status collection" });
            return;
        }

        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });

        res.json(data);
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
