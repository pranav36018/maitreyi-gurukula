import mongoose from "mongoose";

const wellbeingSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    area: {
      type: String,
      required: true,
      enum: [
        "Physical Health",
        "Emotional Wellbeing",
        "Social Wellbeing",
        "General Wellbeing",
      ],
    },

    status: {
      type: String,
      required: true,
      enum: ["Doing Well", "Needs Attention", "Under Support", "Improving"],
      default: "Doing Well",
    },

    observation: {
      type: String,
      trim: true,
    },

    supportProvided: {
      type: String,
      trim: true,
    },

    observedAt: {
      type: Date,
      default: Date.now,
    },

    followUpRequired: {
      type: Boolean,
      default: false,
    },

    followUpDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Wellbeing = mongoose.model("Wellbeing", wellbeingSchema);

export default Wellbeing;