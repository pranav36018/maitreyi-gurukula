import mongoose from "mongoose";

const responsibilitySchema =
  new mongoose.Schema(
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
          "Classroom",
          "Gurukula",
          "Leadership",
          "Seva",
          "Cultural",
          "Other",
        ],
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      startDate: {
        type: Date,
      },

      endDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active",
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

const Responsibility =
  mongoose.model(
    "Responsibility",
    responsibilitySchema
  );

export default Responsibility;