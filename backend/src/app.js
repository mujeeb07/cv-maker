const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cvRoutes = require("./routes/cvRoutes")

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/cv", cvRoutes);                     

app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;
 