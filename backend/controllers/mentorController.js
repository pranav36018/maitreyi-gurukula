
import Mentor from "../models/Mentor.js";

export const getMentors = async (req, res, next) => {
  try {
    const mentors = await Mentor.find().sort({ name: 1 });
    res.json({ success: true, count: mentors.length, data: mentors });
  } catch (error) {
    next(error);
  }
};

export const createMentor = async (req, res, next) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      data: mentor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMentor = async (req, res, next) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.json({ success: true, data: mentor });
  } catch (error) {
    next(error);
  }
};

export const deleteMentor = async (req, res, next) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    // Keep mentors who are assigned to children.
    mentor.status = "Inactive";
    await mentor.save();

    res.json({
      success: true,
      message: "Mentor deactivated successfully",
      data: mentor,
    });
  } catch (error) {
    next(error);
  }
};
