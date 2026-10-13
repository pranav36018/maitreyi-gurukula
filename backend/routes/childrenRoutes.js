
import express from "express";

import {
  getChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
  restoreChild,
} from "../controllers/childController.js";

const router = express.Router();

router.get("/", getChildren);

router.post("/", createChild);

router.patch("/:id/archive", deleteChild);

router.patch("/:id/restore", restoreChild);

router.get("/:id", getChildById);

router.put("/:id", updateChild);

// Keep compatibility with the existing frontend.
router.delete("/:id", deleteChild);

export default router;
