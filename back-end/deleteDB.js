import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/todoDB"; // apna DB name yahan
mongoose.connect(uri);

const db = mongoose.connection;

db.once("open", async () => {
    console.log("Connected to DB");

    try {
        await db.dropDatabase();
        console.log("✅ Database deleted successfully!");
    } catch (err) {
        console.error("Error deleting database:", err);
    } finally {
        mongoose.disconnect();
    }
});
