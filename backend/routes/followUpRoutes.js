import express from "express";

import {
  getFollowUps,
  getFollowUpsByChild,
  createFollowUp,
  updateFollowUp,
  deleteFollowUp,
} from "../controllers/followUpController.js";

const router = express.Router();

router.get("/", getFollowUps);

router.get("/child/:childId", getFollowUpsByChild);

router.post("/", createFollowUp);

router.put("/:id", updateFollowUp);

router.delete("/:id", deleteFollowUp);

export default router;