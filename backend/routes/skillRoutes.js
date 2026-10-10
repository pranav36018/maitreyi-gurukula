import express from "express";

import {
  getSkillsByChild,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/child/:childId", getSkillsByChild);

router.post("/", createSkill);

router.put("/:id", updateSkill);

router.delete("/:id", deleteSkill);

export default router;