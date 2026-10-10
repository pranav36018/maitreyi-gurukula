import FollowUp from "../models/FollowUp.js";

export const getFollowUps = async (req, res, next) => {
  try {
    const followUps = await FollowUp.find()
      .populate("child", "firstName middleName lastName grade admissionNumber")
      .sort({ dueDate: 1, createdAt: -1 });

    res.json({
      success: true,
      count: followUps.length,
      data: followUps,
    });
  } catch (error) {
    next(error);
  }
};

export const getFollowUpsByChild = async (req, res, next) => {
  try {
    const followUps = await FollowUp.find({
      child: req.params.childId,
    }).sort({ dueDate: 1, createdAt: -1 });

    res.json({
      success: true,
      count: followUps.length,
      data: followUps,
    });
  } catch (error) {
    next(error);
  }
};

export const createFollowUp = async (req, res, next) => {
  try {
    const followUp = await FollowUp.create(req.body);

    res.status(201).json({
      success: true,
      message: "Follow-up created successfully",
      data: followUp,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFollowUp = async (req, res, next) => {
  try {
    const followUp = await FollowUp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!followUp) {
      return res.status(404).json({
        success: false,
        message: "Follow-up not found",
      });
    }

    res.json({
      success: true,
      message: "Follow-up updated successfully",
      data: followUp,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFollowUp = async (req, res, next) => {
  try {
    const followUp = await FollowUp.findByIdAndDelete(req.params.id);

    if (!followUp) {
      return res.status(404).json({
        success: false,
        message: "Follow-up not found",
      });
    }

    res.json({
      success: true,
      message: "Follow-up deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};