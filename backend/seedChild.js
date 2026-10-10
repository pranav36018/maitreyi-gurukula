import dotenv from "dotenv";
import mongoose from "mongoose";

import Child from "./models/Child.js";

dotenv.config();

const createDemoChild = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    const existingChild = await Child.findOne({
      admissionNumber: "MG-DEMO-001",
    });

    if (existingChild) {
      console.log("Demo child already exists.");
      process.exit(0);
    }

    const child = await Child.create({
      admissionNumber: "MG-DEMO-001",
      firstName: "Demo",
      middleName: "",
      lastName: "Child",
      dateOfBirth: new Date("2012-05-15"),
      gender: "Female",
      grade: "8",
      admissionYear: 2021,
      admissionDate: new Date("2021-06-01"),
      mentor: "Demo Mentor",
      status: "Active",
      phone: "",
      email: "",
      address: "",
      notes:
        "Temporary demo record for testing the Gurukula database connection.",
    });

    console.log("Demo child created successfully:");
    console.log(child);

    process.exit(0);
  } catch (error) {
    console.error("Failed to create demo child:");
    console.error(error.message);

    process.exit(1);
  }
};

createDemoChild();