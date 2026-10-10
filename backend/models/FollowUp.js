import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
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
        "Academic Support",
        "Skill Development",
        "Wellbeing",
        "Mentorship",
        "General",
      ],
    },

    note: {
      type: String,
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    assignedTo: {
      type: String,
      trim: true,
      default: "Gurukula Mentor",
    },

    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const FollowUp = mongoose.model("FollowUp", followUpSchema);

export default FollowUp;