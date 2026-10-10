import express from "express";

import {
  getFamilyByChild,
  createFamily,
  updateFamily,
  deleteFamily,
} from "../controllers/familyController.js";

const router = express.Router();

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