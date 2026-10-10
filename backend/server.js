import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
  })
);

app.use(express.json());

// =====================================
// BASIC ROUTES
// =====================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Maitreyi Gurukula API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message:
      "Gurukula backend is healthy",
    timestamp: new Date().toISOString(),
  });
});

// =====================================
// API ROUTES
// =====================================

app.use(
  "/api/children",
  childrenRoutes
);

app.use(
  "/api/admissions",
  admissionRoutes
);

app.use(
  "/api/observations",
  observationRoutes
);

app.use(
  "/api/achievements",
  achievementRoutes
);

app.use(
  "/api/skills",
  skillRoutes
);

app.use(
  "/api/follow-ups",
  followUpRoutes
);

app.use(
  "/api/academics",
  academicRoutes
);

app.use(
  "/api/wellbeing",
  wellbeingRoutes
);


app.use("/api/responsibilities", responsibilityRoutes);
app.use("/api/family", familyRoutes);
app.use(
  "/api/documents",
  documentRoutes
);

app.use("/api/mentors", mentorRoutes);

// =====================================
// 404
// =====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// =====================================
// ERROR HANDLER
// =====================================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message ||
      "Internal server error",
  });
});

// =====================================
// START SERVER
// =====================================

const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      "MongoDB connected successfully"
    );

    app.listen(PORT, () => {
      console.log(
        `Gurukula backend running on port ${PORT}`
      );

      console.log(
        `http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "MongoDB connection failed:"
    );

    console.error(error.message);

    process.exit(1);
  }
};

startServer();