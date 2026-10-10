import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    guardianName: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      required: true,
      enum: [
        "Mother",
        "Father",
        "Guardian",
        "Grandparent",
        "Other",
      ],
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    occupation: {
      type: String,
      trim: true,
    },

    skillsInterests: {
      type: String,
      trim: true,
    },

    familyInvolvement: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Family = mongoose.model(
  "Family",
  familySchema
);

export default Family;