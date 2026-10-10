
import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    expertise: { type: String, trim: true },
    responsibilities: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Mentor", mentorSchema);
