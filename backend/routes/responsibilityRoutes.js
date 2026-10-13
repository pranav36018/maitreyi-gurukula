import express from "express";

import {
  getResponsibilities,
  getResponsibilitiesByChild,
  createResponsibility,
  updateResponsibility,
  deleteResponsibility,
} from "../controllers/responsibilityController.js";

const router = express.Router();

router.get("/", getResponsibilities);

router.get(
  "/child/:childId",
  getResponsibilitiesByChild
);

router.post(
  "/",
  createResponsibility
);

router.put(
  "/:id",
  updateResponsibility
);

router.delete(
  "/:id",
  deleteResponsibility
);

export default router;