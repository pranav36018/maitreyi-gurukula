
import mongoose from "mongoose";
import Admission from "../models/Admission.js";
import Child from "../models/Child.js";
import Mentor from "../models/Mentor.js";

export const getAdmissions = async (req, res, next) => {
  try {
    const admissions = await Admission.find()
      .populate(
        "convertedChild",
        "firstName middleName lastName grade admissionNumber"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdmissionById = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id).populate(
      "convertedChild",
      "firstName middleName lastName grade admissionNumber"
    );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.json({ success: true, data: admission });
  } catch (error) {
    next(error);
  }
};

export const createAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.create(req.body);

    res.status(201).json({
      success: true,
      message: "Admission enquiry created successfully",
      data: admission,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdmission = async (req, res, next) => {
  try {
    // The child link must only be set by the conversion endpoint.
    const updates = { ...req.body };
    delete updates.convertedChild;

    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate(
      "convertedChild",
      "firstName middleName lastName grade admissionNumber"
    );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.json({
      success: true,
      message: "Admission updated successfully",
      data: admission,
    });
  } catch (error) {
    next(error);
  }
};


export const convertAdmissionToChild = async (req, res, next) => {
  let createdChildId = null;

  try {
    const { grade, joiningDate, mentorId } = req.body;

    if (!grade || !String(grade).trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide the child's grade.",
      });
    }

    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    if (admission.convertedChild) {
      const existingChild = await Child.findById(
        admission.convertedChild
      ).populate("mentorId", "name phone email");

      if (existingChild) {
        return res.status(200).json({
          success: true,
          message: "This admission is already linked to a child profile.",
          data: existingChild,
        });
      }

      return res.status(409).json({
        success: false,
        message:
          "This admission has a broken child link. Please review the records before converting again.",
      });
    }

    if (admission.status !== "Selected as Student") {
      return res.status(400).json({
        success: false,
        message:
          'Set the admission status to "Selected as Student" before confirming joining.',
      });
    }

    const actualJoiningDate = joiningDate
      ? new Date(joiningDate)
      : new Date();

    if (Number.isNaN(actualJoiningDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid joining date.",
      });
    }

    // Validate the selected mentor, if one was provided.
    let selectedMentor = null;

    if (mentorId) {
      if (!mongoose.Types.ObjectId.isValid(mentorId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid mentor selection.",
        });
      }

      selectedMentor = await Mentor.findById(mentorId);

      if (!selectedMentor) {
        return res.status(404).json({
          success: false,
          message: "Selected mentor was not found.",
        });
      }

      if (selectedMentor.status !== "Active") {
        return res.status(400).json({
          success: false,
          message: "Please select an active mentor.",
        });
      }
    }

    // Generate a unique admission number.
    let admissionNumber;
    let attempts = 0;

    do {
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      admissionNumber = `MG-${actualJoiningDate.getFullYear()}-${randomPart}`;
      attempts += 1;
    } while (
      (await Child.exists({ admissionNumber })) &&
      attempts < 10
    );

    if (await Child.exists({ admissionNumber })) {
      return res.status(500).json({
        success: false,
        message:
          "Could not generate a unique admission number. Please retry.",
      });
    }

    const child = await Child.create({
      admissionNumber,
      firstName: admission.childFirstName,
      middleName: admission.childMiddleName,
      lastName: admission.childLastName,
      dateOfBirth: admission.dateOfBirth,
      gender: admission.gender || "Female",
      grade: String(grade).trim(),
      admissionDate: actualJoiningDate,
      admissionYear: actualJoiningDate.getFullYear(),
      phone: admission.parentPhone,
      email: admission.parentEmail,
      address: admission.address,

      // Save both the mentor reference and name for compatibility.
      mentorId: selectedMentor ? selectedMentor._id : null,
      mentor: selectedMentor ? selectedMentor.name : "",

      notes: [
        `Parent/guardian: ${admission.parentName}`,
        admission.notes
          ? `Admission notes: ${admission.notes}`
          : "",
        `Created from admission record ${admission._id}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    createdChildId = child._id;

    admission.convertedChild = child._id;
    await admission.save();

    const populatedChild = await Child.findById(child._id)
      .populate("mentorId", "name phone email");

    return res.status(201).json({
      success: true,
      message:
        "Child profile created and linked to the admission successfully.",
      data: populatedChild,
    });
  } catch (error) {
    // Avoid leaving a child record behind if linking fails.
    if (createdChildId) {
      try {
        await Child.findByIdAndDelete(createdChildId);
      } catch {
        // Preserve the original error.
      }
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};


export const deleteAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    // The permanent child record is intentionally not deleted.
    res.json({
      success: true,
      message: "Admission deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
