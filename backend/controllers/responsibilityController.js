import Responsibility from "../models/Responsibility.js";

export const getResponsibilitiesByChild = async (
  req,
  res,
  next
) => {
  try {
    const responsibilities =
      await Responsibility.find({
        child: req.params.childId,
      }).sort({
        startDate: -1,
        createdAt: -1,
      });

    res.json({
      success: true,
      count: responsibilities.length,
      data: responsibilities,
    });
  } catch (error) {
    next(error);
  }
};

export const createResponsibility = async (
  req,
  res,
  next
) => {
  try {
    const responsibility =
      await Responsibility.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Responsibility created successfully",
      data: responsibility,
    });
  } catch (error) {
    next(error);
  }
};

export const updateResponsibility = async (
  req,
  res,
  next
) => {
  try {
    const responsibility =
      await Responsibility.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!responsibility) {
      return res.status(404).json({
        success: false,
        message: "Responsibility not found",
      });
    }

    res.json({
      success: true,
      message:
        "Responsibility updated successfully",
      data: responsibility,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResponsibility = async (
  req,
  res,
  next
) => {
  try {
    const responsibility =
      await Responsibility.findByIdAndDelete(
        req.params.id
      );

    if (!responsibility) {
      return res.status(404).json({
        success: false,
        message: "Responsibility not found",
      });
    }

    res.json({
      success: true,
      message:
        "Responsibility deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};