import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    childFirstName: {
      type: String,
      required: true,
      trim: true,
    },

    childMiddleName: {
      type: String,
      trim: true,
    },

    childLastName: {
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

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    parentPhone: {
      type: String,
      trim: true,
    },

    parentEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    address: {
      type: String,
      trim: true,
    },

    referralSource: {
      type: String,
      trim: true,
    },

    enquiryDate: {
      type: Date,
      default: Date.now,
    },

    applicationDate: {
      type: Date,
    },

    interviewDate: {
      type: Date,
    },

    interviewNotes: {
      type: String,
      trim: true,
    },

    assessmentNotes: {
      type: String,
      trim: true,
    },

    observations: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Application Received",
        "Selected for Interview",
        "Invited",
        "Selected as Student",
        "Not Interested",
        "Not Eligible",
        "Admission Not Taken",
        "To Be Followed Up Later",
      ],
      default: "Application Received",
    },

    nextFollowUpDate: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
    },

    convertedChild: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

admissionSchema.virtual("name").get(function () {
  return [this.childFirstName, this.childMiddleName, this.childLastName].filter(Boolean).join(" ");
});

admissionSchema.virtual("fullName").get(function () {
  return [this.childFirstName, this.childMiddleName, this.childLastName].filter(Boolean).join(" ");
});

const Admission = mongoose.model("Admission", admissionSchema);

export default Admission;