import express from "express";

import {
  getAcademicsByChild,
  createAcademic,
  updateAcademic,
  deleteAcademic,
} from "../controllers/academicController.js";

const router = express.Router();

router.get("/child/:childId", getAcademicsByChild);

router.post("/", createAcademic);

router.put("/:id", updateAcademic);

router.delete("/:id", deleteAcademic);

export default router;