import express from "express";

import {
  getFamilies,
  getFamilyByChild,
  createFamily,
  updateFamily,
  deleteFamily,
} from "../controllers/familyController.js";

const router = express.Router();

router.get("/", getFamilies);

router.get(
  "/child/:childId",
  getFamilyByChild
);

router.post(
  "/",
  createFamily
);

router.put(
  "/:id",
  updateFamily
);

router.delete(
  "/:id",
  deleteFamily
);

export default router;