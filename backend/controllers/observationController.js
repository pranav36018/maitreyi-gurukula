import Observation from "../models/Observation.js";

export const getObservationsByChild = async (
  req,
  res,
  next
) => {
  try {
    const observations = await Observation.find({
      child: req.params.childId,
    }).sort({
      observedAt: -1,
      createdAt: -1,
    });

    res.json({
      success: true,
      count: observations.length,
      data: observations,
    });
  } catch (error) {
    next(error);
  }
};

export const createObservation = async (
  req,
  res,
  next
) => {
  try {
    const observation =
      await Observation.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Observation created successfully",
      data: observation,
    });
  } catch (error) {
    next(error);
  }
};

export const updateObservation = async (
  req,
  res,
  next
) => {
  try {
    const observation =
      await Observation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!observation) {
      return res.status(404).json({
        success: false,
        message: "Observation not found",
      });
    }

    res.json({
      success: true,
      message:
        "Observation updated successfully",
      data: observation,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteObservation = async (
  req,
  res,
  next
) => {
  try {
    const observation =
      await Observation.findByIdAndDelete(
        req.params.id
      );

    if (!observation) {
      return res.status(404).json({
        success: false,
        message: "Observation not found",
      });
    }

    res.json({
      success: true,
      message:
        "Observation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};