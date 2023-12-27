app.get("/ts/:studentId", async (req, res) => {
    const studentId = req.params.studentId;

    try {

        const classADocument = await db.collection("ClassA").doc(studentId).get();

        if (!classADocument.exists) {
            res.status(404).json({ error: "ClassA Document not found", studentId });
            return;
        }

        const classAData = { id: classADocument.id, ...classADocument.data() };

        const locationDocument = await db.collection("location").doc(studentId).get();

        if (!locationDocument.exists) {
            res.status(404).json({ error: "Location Document not found", studentId });
            return;
        }

        const locationData = { id: locationDocument.id, ...locationDocument.data() };

        const orderDocument = await db.collection("order").doc(studentId).get();

        if (!orderDocument.exists) {
            res.status(404).json({ error: "Order Document not found", studentId });
            return;
        }

        const orderData = { id: orderDocument.id, ...orderDocument.data() };

        const storeDocument = await db.collection("store").doc(studentId).get();

        if (!storeDocument.exists) {
            res.status(404).json({ error: "Store Document not found", studentId });
            return;
        }

        const storeData = { id: storeDocument.id, ...storeDocument.data() };

        const mergedData = {
            classA: classAData,
            location: locationData,
            order: orderData,
            store: storeData
        };

        res.json(mergedData);
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
