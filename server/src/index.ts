// server/src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.get("/api/test", (req: Request, res: Response) => {
  res.send("Hello, test!");
});
// API Route to serve bus schedule
app.get("/api/bus-schedule", (req: Request, res: Response) => {
  const schedulePath = path.join(__dirname, "bus_schedule.json");
  fs.readFile(schedulePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading bus schedule:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
