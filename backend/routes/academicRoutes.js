import express from "express";

import {
  getAcademics,
  getAcademicsByChild,
  createAcademic,
  updateAcademic,
  deleteAcademic,
} from "../controllers/academicController.js";

const router = express.Router();

router.get("/", getAcademics);
router.get("/child/:childId", getAcademicsByChild);

router.post("/", createAcademic);

router.put("/:id", updateAcademic);

router.delete("/:id", deleteAcademic);

export default router;