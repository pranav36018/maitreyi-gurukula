import express from "express";

import {
  getWellbeings,
  getWellbeingByChild,
  createWellbeing,
  updateWellbeing,
  deleteWellbeing,
} from "../controllers/wellbeingController.js";

const router = express.Router();

router.get("/", getWellbeings);
router.get("/child/:childId", getWellbeingByChild);

router.post("/", createWellbeing);

router.put("/:id", updateWellbeing);

router.delete("/:id", deleteWellbeing);

export default router;