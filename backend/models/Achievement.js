import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
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
        "Academic",
        "Sports",
        "Arts",
        "Leadership",
        "Cultural",
        "Other",
      ],
    },

    achievementDate: {
      type: Date,
    },

    level: {
      type: String,
      enum: [
        "Gurukula",
        "School",
        "District",
        "State",
        "National",
        "International",
        "Other",
      ],
      default: "Gurukula",
    },

    description: {
      type: String,
      trim: true,
    },

    certificate: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model(
  "Achievement",
  achievementSchema
);

export default Achievement;