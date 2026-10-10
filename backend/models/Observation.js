import mongoose from "mongoose";

const observationSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Academic",
        "Skill Development",
        "Wellbeing",
        "Mentorship",
        "General",
      ],
    },

    tags: {
      type: [String],
      default: [],
    },

    note: {
      type: String,
      required: true,
      trim: true,
    },

    followUpRequired: {
      type: Boolean,
      default: false,
    },

    followUpDate: {
      type: Date,
    },

    observer: {
      type: String,
      trim: true,
      default: "Gurukula Mentor",
    },

    observedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Observation = mongoose.model(
  "Observation",
  observationSchema
);

export default Observation;