import express from "express";

import {
  getAchievementsByChild,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

const router = express.Router();

router.get(
  "/child/:childId",
  getAchievementsByChild
);

router.post(
  "/",
  createAchievement
);

router.put(
  "/:id",
  updateAchievement
);

router.delete(
  "/:id",
  deleteAchievement
);

export default router;