import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import deviceRouter from "./src/routes/deviceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/devices", deviceRouter);

app.get("/", (req, res) => {
  res.send("Salve");
});

// Listening server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
