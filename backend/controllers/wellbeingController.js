import Wellbeing from "../models/Wellbeing.js";

export const getWellbeingByChild = async (req, res, next) => {
  try {
    const records = await Wellbeing.find({
      child: req.params.childId,
    }).sort({
      observedAt: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export const createWellbeing = async (req, res, next) => {
  try {
    const record = await Wellbeing.create(req.body);

    res.status(201).json({
      success: true,
      message: "Wellbeing record created successfully",
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWellbeing = async (req, res, next) => {
  try {
    const record = await Wellbeing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Wellbeing record not found",
      });
    }

    res.json({
      success: true,
      message: "Wellbeing record updated successfully",
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWellbeing = async (req, res, next) => {
  try {
    const record = await Wellbeing.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Wellbeing record not found",
      });
    }

    res.json({
      success: true,
      message: "Wellbeing record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};