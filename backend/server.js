
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import childrenRoutes from "./routes/childrenRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import observationRoutes from "./routes/observationRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import followUpRoutes from "./routes/followUpRoutes.js";
import academicRoutes from "./routes/academicRoutes.js";
import wellbeingRoutes from "./routes/wellbeingRoutes.js";
import responsibilityRoutes from "./routes/responsibilityRoutes.js";
import familyRoutes from "./routes/familyRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDistPath = path.resolve(
  __dirname,
  "../frontend/dist"
);

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://maitreyi-gurukula.onrender.com",
  process.env.CLIENT_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  if (/\.vercel\.app$/.test(origin)) return true;
  return false;
};

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      console.warn("CORS blocked origin:", origin);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  const indexHtml = path.join(frontendDistPath, "index.html");
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  }

  res.json({
    success: true,
    message: "Maitreyi Gurukula API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Gurukula backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/children", childrenRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/follow-ups", followUpRoutes);
app.use("/api/followups", followUpRoutes);
app.use("/api/academics", academicRoutes);
app.use("/api/wellbeing", wellbeingRoutes);
app.use("/api/wellbeings", wellbeingRoutes);
app.use("/api/responsibilities", responsibilityRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/families", familyRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/mentors", mentorRoutes);

// Serve the built frontend when one is available.
app.use(express.static(frontendDistPath));

app.use((req, res, next) => {
  if (
    req.method !== "GET" ||
    req.path.startsWith("/api/")
  ) {
    return next();
  }

  res.sendFile(
    path.join(frontendDistPath, "index.html"),
    (error) => {
      if (error) next(error);
    }
  );
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Gurukula backend running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
