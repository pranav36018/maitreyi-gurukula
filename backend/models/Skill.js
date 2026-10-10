import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    skillName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    developmentLevel: {
      type: String,
      required: true,
      enum: [
        "Exploring",
        "Developing",
        "Strong",
        "Advanced",
      ],
    },

    interestLevel: {
      type: String,
      enum: ["Low", "Moderate", "High"],
      default: "Moderate",
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;