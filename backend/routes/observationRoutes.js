import express from "express";

import {
  getObservationsByChild,
  createObservation,
  updateObservation,
  deleteObservation,
} from "../controllers/observationController.js";

const router = express.Router();

router.get(
  "/child/:childId",
  getObservationsByChild
);

router.post(
  "/",
  createObservation
);

router.put(
  "/:id",
  updateObservation
);

router.delete(
  "/:id",
  deleteObservation
);

export default router;