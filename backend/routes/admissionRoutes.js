import express from "express";
import { convertAdmissionToChild } from "../controllers/admissionController.js";


import {
  getAdmissions,
  getAdmissionById,
  createAdmission,
  updateAdmission,
  deleteAdmission,
} from "../controllers/admissionController.js";

const router = express.Router();

router.get("/", getAdmissions);

router.get("/:id", getAdmissionById);

router.post("/", createAdmission);

router.put("/:id", updateAdmission);

router.post("/:id/convert-to-child", convertAdmissionToChild);

router.delete("/:id", deleteAdmission);

export default router;