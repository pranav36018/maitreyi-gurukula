import express from "express";

import {
  getWellbeingByChild,
  createWellbeing,
  updateWellbeing,
  deleteWellbeing,
} from "../controllers/wellbeingController.js";

const router = express.Router();

router.get("/child/:childId", getWellbeingByChild);

router.post("/", createWellbeing);

router.put("/:id", updateWellbeing);

router.delete("/:id", deleteWellbeing);

export default router;