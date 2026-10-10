import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Admission",
        "Academic",
        "Achievement",
        "Certificate",
        "Health",
        "Other",
      ],
    },

    documentDate: {
      type: Date,
    },

    description: {
      type: String,
      trim: true,
    },

    documentUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model(
  "Document",
  documentSchema
);

export default Document;