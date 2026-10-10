import express from "express";

import {
  getDocumentsByChild,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.get(
  "/child/:childId",
  getDocumentsByChild
);

router.post(
  "/",
  createDocument
);

router.put(
  "/:id",
  updateDocument
);

router.delete(
  "/:id",
  deleteDocument
);

export default router;