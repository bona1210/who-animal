const express = require('express');
const db = require("./config");
const app = express();
const cors = require("cors");
app.use(cors());



app.get("/ts/classA/:studentId", async (req, res) => {
    // 從動態路由參數中取得 studentId
    const studentId = req.params.studentId;

    try {
        const document = await db.collection("ClassA").doc(studentId).get();

        if (!document.exists) {
            res.status(404).json({ error: "Document not found", studentId });
            return;
        }

        const data = { id: document.id, ...document.data() };
        res.json(data);
    } catch (error) {
        console.error("Error retrieving document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//-----------------------------------------------------------------
app.get("/ts/location/:studentId", async (req, res) => {
    // 從動態路由參數中取得 studentId
    const studentId = req.params.studentId;

    try {
        const document = await db.collection("location").doc(studentId).get();

        if (!document.exists) {
            res.status(404).json({ error: "Document not found", studentId });
            return;
        }

        const data = { id: document.id, ...document.data() };
        res.json(data);
    } catch (error) {
        console.error("Error retrieving document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//-----------------------------------------------------------------
app.get("/ts/order/:studentId", async (req, res) => {
    // 從動態路由參數中取得 studentId
    const studentId = req.params.studentId;

    try {
        const document = await db.collection("order").doc(studentId).get();

        if (!document.exists) {
            res.status(404).json({ error: "Document not found", studentId });
            return;
        }

        const data = { id: document.id, ...document.data() };
        res.json(data);
    } catch (error) {
        console.error("Error retrieving document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//-----------------------------------------------------------------
app.get("/ts/store/:studentId", async (req, res) => {
    // 從動態路由參數中取得 studentId
    const studentId = req.params.studentId;

    try {
        const document = await db.collection("store").doc(studentId).get();

        if (!document.exists) {
            res.status(404).json({ error: "Document not found", studentId });
            return;
        }

        const data = { id: document.id, ...document.data() };
        res.json(data);
    } catch (error) {
        console.error("Error retrieving document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//-----------------------------------------------------------------
app.get("/ts/status/:studentId", async (req, res) => {
    // 從動態路由參數中取得 studentId
    const studentId = req.params.studentId;

    try {
        const document = await db.collection("status").doc(studentId).get();

        if (!document.exists) {
            res.status(404).json({ error: "Document not found", studentId });
            return;
        }

        const data = { id: document.id, ...document.data() };
        res.json(data);
    } catch (error) {
        console.error("Error retrieving document:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));


