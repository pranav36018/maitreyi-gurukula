
import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      default: "Female",
    },

    grade: {
      type: String,
      required: true,
    },

    admissionYear: {
      type: Number,
    },

    admissionDate: {
      type: Date,
    },

    // Keep the existing mentor name for compatibility.
    mentor: {
      type: String,
      trim: true,
    },

    // Link the child to a record in the Mentors collection.
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "Alumni", "Inactive"],
      default: "Active",
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

    address: {
      type: String,
      trim: true,
    },

    profilePhoto: {
      type: String,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Child = mongoose.model("Child", childSchema);

export default Child;
